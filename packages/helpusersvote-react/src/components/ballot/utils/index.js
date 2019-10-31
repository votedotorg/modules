import storage from 'localforage'
import HmacSHA1 from 'crypto-js/hmac-sha1'
import CryptoJS from 'crypto-js'
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
const CRYPTO_SALT = '9999'
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
  const encryptedValues = ""
  var decryptedAddress = decrypt(decodeURIComponent(payload.ak), CRYPTO_SALT)
  decryptedAddress = decryptedAddress.toString(CryptoJS.enc.Utf8)
  setEncryptedAddress(JSON.parse(decryptedAddress))

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

  payload.ak = getLocalItem(ADDRESS_STORAGE_KEY)
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
  var decryptedJSON = getLocalItem(key)
  if (decryptedJSON.length === 0) {
    return null
  }

  try {
    var serializedValue = decrypt(decodeURIComponent(decryptedJSON), CRYPTO_SALT)
    serializedValue = serializedValue.toString(CryptoJS.enc.Utf8)

    if (!serializedValue || serializedValue.length === 0) {
      return null
    }

    const value = JSON.parse(serializedValue)

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
  const encryptedJSON = encodeURIComponent(
    encrypt(JSON.stringify(inputValue), CRYPTO_SALT))

  setLocalItem(key, encryptedJSON)
  return true
}

// High-level get/set APIs

var keySize = 256;
var iterations = 100;

function encrypt (msg, pass) {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var iv = CryptoJS.lib.WordArray.random(128/8);
  
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  });
  
  var encryptedMessage = salt.toString()+ iv.toString() + encrypted.toString();
  return encryptedMessage;
}

function decrypt (encryptedMessage, pass) {
  var salt = CryptoJS.enc.Hex.parse(encryptedMessage.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(encryptedMessage.substr(32, 32))
  var encrypted = encryptedMessage.substring(64);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted;
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
