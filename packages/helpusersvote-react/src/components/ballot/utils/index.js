import storage from 'localforage'
import HmacSHA1 from 'crypto-js/hmac-sha1'
import Base58 from './base-58'
import { getConfig, storeConfig } from './network'

export * from './qr-code'

// Only run client-side when localStorage is available
if (typeof window !== 'undefined') {
  const { LOCALSTORAGE: driver } = storage

  storage.config({
    driver,
    name: 'huv'
  })
}

export function getMoreInfoLink({ href, term }) {
  const moreInfoHref = href || 'ballotpedia.org'

  return `http://www.google.com/search?q=${term}+site%3A${moreInfoHref}&btnI`
}

export function getMoreCandidateInfoLink({ href, contest, state, candidate }) {
  let term = candidate.names ? candidate.names[0] : candidate.name

  if (!contest.roles || contest.roles[0] !== 'headOfGovernment') {
    if (state) {
      term = `"${term}" ${state}`
    }
  }

  return getMoreInfoLink({
    href,
    term
  })
}

export function getPartyColor(party) {
  switch (party) {
    case 'Democratic':
    case 'Democratic Party':
    case 'Democratic-NPL Party':
    case 'Democratic-Farmer-Labor Party':
      return 'blue'
    case 'Reform Party':
    case 'SAM Party':
      return 'dark-blue'
    case 'Green':
    case 'Green Party':
      return 'green'
    case 'Libertarian':
    case 'Libertarian Party':
      return 'yellow'
    case 'Republican':
    case 'Republican Party':
      return 'red'
    case 'Independence Party of New York':
      return 'dark-red'
    case 'Conservative':
      return 'red o-60'
    case "Women's Equality":
      return 'blue-we'
    case 'Working Families':
    case 'Working Families Party':
      return 'blue-wf'
    default:
      return 'unknown'
  }
}

/*
 * Encryption & Decryption
 */

const CRYPTO_ALGO = 'AES-CTR'
const BALLOT_STORAGE_KEY = 'enc_ballot'
const BALLOT_CRYPTO_KEY_NAME = 'ballot'
const ADDRESS_STORAGE_KEY = 'enc_address'
const ADDRESS_CRYPTO_KEY_NAME = 'address'
const VOTER_INFO_STORAGE_KEY = 'enc_voter_info'

const LOCALSTORAGE_VALUE_PREFIX = '__lfsc__:'
const toStorageKey = {
  ak: 'key_' + ADDRESS_CRYPTO_KEY_NAME,
  ac: ADDRESS_STORAGE_KEY + '_ctr',
  bk: 'key_' + BALLOT_CRYPTO_KEY_NAME,
  bc: BALLOT_STORAGE_KEY + '_ctr'
}

function getLocalItem(key) {
  const value = window.localStorage['huv/' + key] || ''

  return value.replace(LOCALSTORAGE_VALUE_PREFIX, '')
}

function setLocalItem(key, value) {
  if (!(key && value)) {
    return
  }

  window.localStorage['huv/' + key] = LOCALSTORAGE_VALUE_PREFIX + value
}

function getEncryptedValuesFromStorage() {
  const enc_address = getLocalItem('enc_address')
  const enc_ballot = getLocalItem('enc_ballot')

  return { enc_address, enc_ballot }
}

const namespaceId = 'ebd_vdo'

export async function persistEncryptedValues() {
  try {
    const configId = generateKeyId()
    const values = getEncryptedValuesFromStorage()

    return await storeConfig({
      namespaceId,
      configId,
      body: values
    })
  } catch (err) {
    console.error(err)
    return true
  }
}

function confirmBallotRecovery() {
  return window.confirm(
    'You already have a ballot saved. Do you want to override it?'
  )
}

export async function recoverEncryptedValues(opts = {}) {
  if (getLocalItem(BALLOT_STORAGE_KEY)) {
    if (!confirmBallotRecovery()) {
      return false
    }
  }

  const { hash = '' } = opts
  const payload = parseKeyFragment(hash)
  const configId = generateKeyId(payload)
  const encryptedValues = await getConfig({
    namespaceId,
    configId
  })

  const delta = {
    ...encryptedValues,
    ...Object.keys(payload).reduce(
      (acc, k) => ({
        ...acc,
        [toStorageKey[k]]: payload[k]
      }),
      {}
    )
  }

  Object.keys(delta).forEach(key => setLocalItem(key, delta[key]))

  return true
}

export function parseKeyFragment(fragment) {
  const hash = decodeURIComponent(fragment.replace('#', ''))
  const values = hash.split('&').reduce((acc, str) => {
    let [key, ...rest] = str.split('=')
    return { ...acc, [key]: rest.join('=') }
  }, {})

  return values
}

export function generateKeyId(opts = {}) {
  const {
    ak = getLocalItem(toStorageKey['ak']),
    ac = getLocalItem(toStorageKey['ac']),
    bk = getLocalItem(toStorageKey['bk']),
    bc = getLocalItem(toStorageKey['bc'])
  } = opts

  return (
    'ekv_' + HmacSHA1([ak, ac].join('-'), [bk, bc].join('-')).toString(Base58)
  )
}

window.generateKeyId = generateKeyId

export async function getKeyFragment() {
  const payload = {}

  payload.ak = getLocalItem('key_' + ADDRESS_CRYPTO_KEY_NAME)
  payload.ac = getLocalItem(ADDRESS_STORAGE_KEY + '_ctr')
  payload.bk = getLocalItem('key_' + BALLOT_CRYPTO_KEY_NAME)
  payload.bc = getLocalItem(BALLOT_STORAGE_KEY + '_ctr')

  return (
    '#' +
    Object.keys(payload)
      .map(k => `${k}=${encodeURIComponent(payload[k])}`)
      .join('&')
  )
}

export async function getEncryptedBallot() {
  const cryptoKeyName = BALLOT_CRYPTO_KEY_NAME
  const key = BALLOT_STORAGE_KEY

  return (await getEncryptedJSON({ cryptoKeyName, key })) || {}
}

export async function getEncryptedAddress() {
  const cryptoKeyName = ADDRESS_CRYPTO_KEY_NAME
  const key = ADDRESS_STORAGE_KEY

  return await getEncryptedJSON({ cryptoKeyName, key })
}

export async function getEncryptedVoterInfo() {
  const cryptoKeyName = ADDRESS_CRYPTO_KEY_NAME
  const key = VOTER_INFO_STORAGE_KEY

  return await getEncryptedJSON({ cryptoKeyName, key })
}

export async function setEncryptedBallot(ballot) {
  const cryptoKeyName = BALLOT_CRYPTO_KEY_NAME
  const key = BALLOT_STORAGE_KEY

  return await setEncryptedJSON({ cryptoKeyName, key, value: ballot })
}

export async function setEncryptedAddress(address) {
  const cryptoKeyName = ADDRESS_CRYPTO_KEY_NAME
  const key = ADDRESS_STORAGE_KEY

  return await setEncryptedJSON({ cryptoKeyName, key, value: address })
}

export async function setEncryptedVoterInfo(info) {
  const cryptoKeyName = ADDRESS_CRYPTO_KEY_NAME
  const key = VOTER_INFO_STORAGE_KEY

  return await setEncryptedJSON({ cryptoKeyName, key, value: info })
}

// High-level JSON APIs

async function getEncryptedJSON({ cryptoKeyName, key }) {
  const decryptedArrayBuffer = await getEncryptedData({
    cryptoKeyName,
    key
  })

  if (decryptedArrayBuffer.length === 0) {
    return null
  }

  try {
    const serializedValue = fromArrayBuffer(decryptedArrayBuffer)

    if (!serializedValue || serializedValue.length === 0) {
      return null
    }

    const value = JSON.parse(decodeURIComponent(window.atob(serializedValue)))

    return value
  } catch (err) {
    if (!/Failed to execute/.test(err.toString())) {
      console.error(err)
    } else {
      console.log('huv.getEncryptedJSON: failed to read JSON')
    }

    return null
  }
}

async function setEncryptedJSON({ cryptoKeyName, key, value: inputValue }) {
  const serializedValue = window.btoa(
    encodeURIComponent(JSON.stringify(inputValue))
  )
  const value = toArrayBuffer(serializedValue)

  return await setEncryptedData({
    cryptoKeyName,
    key,
    value
  })
}

// High-level get/set APIs

async function setEncryptedData({ cryptoKeyName, key, value }) {
  try {
    const cryptoKey = await getCryptoKey({ name: cryptoKeyName })

    const { counter, encryptedArrayBuffer } = await encryptData({
      cryptoKey,
      value
    })

    await storage.setItem(key + '_ctr', counter)
    await storage.setItem(key, encryptedArrayBuffer)

    return true
  } catch (err) {
    console.error('huv.ballot: save failed')
    console.error(err)
  }
}

async function getEncryptedData({ cryptoKeyName, key }) {
  const encryptedArrayBuffer = await storage.getItem(key)

  if (!encryptedArrayBuffer) {
    return new ArrayBuffer()
  }

  const counter = await storage.getItem(key + '_ctr')
  const cryptoKey = await getCryptoKey({ name: cryptoKeyName })

  return await decryptData({ cryptoKey, counter, encryptedArrayBuffer })
}

// AES-CTR encrypt/decryptData

function generateCtrIV(length = 16) {
  const ctr = new Uint8Array(length)

  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(ctr)
  } else {
    for (let i = 0; i < length; i++) {
      ctr[i] = Math.floor(Math.random() * 255)
    }
  }

  return ctr
}

async function encryptData({ cryptoKey, value }) {
  const counter = generateCtrIV(16)
  const encryptedArrayBuffer = await window.crypto.subtle.encrypt(
    {
      name: CRYPTO_ALGO,
      counter,
      length: 128
    },
    cryptoKey,
    value
  )

  return { counter, encryptedArrayBuffer }
}

async function decryptData({ cryptoKey, counter, encryptedArrayBuffer }) {
  const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
    {
      name: CRYPTO_ALGO,
      counter,
      length: 128
    },
    cryptoKey,
    encryptedArrayBuffer
  )

  return decryptedArrayBuffer
}

// Low-level crypto key utilities

async function getCryptoKey({ name }) {
  const prevKey = await storage.getItem('key_' + name)

  if (!prevKey) {
    return await generateAndSaveKey({ name })
  }

  return await window.crypto.subtle.importKey(
    'raw',
    prevKey,
    { name: CRYPTO_ALGO },
    false, // not exctractable because it's already serialized
    ['encrypt', 'decrypt']
  )
}

async function generateKey() {
  try {
    const cryptoKey = await window.crypto.subtle.generateKey(
      {
        name: CRYPTO_ALGO,
        length: 256
      },
      true, // Can export key to save in localStorage
      ['encrypt', 'decrypt']
    )

    return cryptoKey
  } catch (err) {
    console.log('huv.generateKey: error')
    throw err
  }
}

async function generateAndSaveKey({ name }) {
  try {
    const cryptoKey = await generateKey()
    const keyData = await window.crypto.subtle.exportKey('raw', cryptoKey)

    await storage.setItem('key_' + name, keyData)

    return cryptoKey
  } catch (err) {
    console.log('huv.ballot.generateAndSaveKey: error')
    console.error(err)
    throw new Error('huv: could not create encryption key')
  }
}

// ArrayBuffer utilities

function fromArrayBuffer(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf))
}

function toArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2)
  const bufUint16 = new Uint16Array(buf)

  for (let i = 0; i < str.length; i++) {
    bufUint16[i] = str.charCodeAt(i)
  }

  return buf
}

if (typeof window !== 'undefined') {
  window.getEncryptedBallot = getEncryptedBallot
}
