import storage from 'localforage'

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
  const moreInfoHref = href || 'ballotready.org'
  return `http://www.google.com/search?q=${term}+site%3A${moreInfoHref}&btnI`
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

export function getMoreCandidateInfoLink({ href, contest, state, candidate }) {
  var term = candidate.names ? candidate.names[0] : candidate.name

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

/*
 * Encryption & Decryption
 */

const CRYPTO_ALGO = 'AES-CTR'
const BALLOT_CRYPTO_KEY_NAME = 'ballot'
const BALLOT_STORAGE_KEY = 'enc_ballot'
const ADDRESS_CRYPTO_KEY_NAME = 'address'
const ADDRESS_STORAGE_KEY = 'enc_address'
const VOTER_INFO_STORAGE_KEY = 'enc_voter_info'

const LOCALSTORAGE_VALUE_PREFIX = '__lfsc__:'

function getLocalItem(key) {
  return window.localStorage['huv/' + key].replace(
    LOCALSTORAGE_VALUE_PREFIX,
    ''
  )
}

export async function getKeyFragment() {
  const bk = getLocalItem('key_' + BALLOT_CRYPTO_KEY_NAME)
  const bc = getLocalItem(BALLOT_STORAGE_KEY + '_ctr')
  const ak = getLocalItem('key_' + ADDRESS_CRYPTO_KEY_NAME)
  const ac = getLocalItem(ADDRESS_STORAGE_KEY + '_ctr')

  return `#ak=${ak}&ac=${ac}&bk=${bk}&bc=${bc}`
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
    console.error(err)
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

async function encryptData({ cryptoKey, value }) {
  const counter = new Uint8Array(16)
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
