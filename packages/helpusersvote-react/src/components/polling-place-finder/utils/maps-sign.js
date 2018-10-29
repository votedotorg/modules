import HmacSHA1 from 'crypto-js/hmac-sha1'
import Base64 from 'crypto-js/enc-base64'

function removeWebSafe(safeEncodedString) {
  return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/')
}

function makeWebSafe(encodedString) {
  return encodedString.replace(/\+/g, '-').replace(/\//g, '_')
}

function decodeBase64Hash(code) {
  return Base64.parse(code)
}

function encodeBase64Hash(data, key) {
  return HmacSHA1(data, key).toString(Base64)
}

export function generateSignature(path, secret) {
  const safeSecret = decodeBase64Hash(removeWebSafe(secret))
  const hashedSignature = makeWebSafe(encodeBase64Hash(path, safeSecret))

  return hashedSignature
}

export default { generateSignature }
