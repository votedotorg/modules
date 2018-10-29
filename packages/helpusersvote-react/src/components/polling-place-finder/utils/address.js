import { getQueryParam } from './url'
import { reportError } from './errors'

/**
 * Render single-line address string.
 *
 * @param {Object} address
 * @return {String}
 */

export function toAddr(address) {
  const { line1 = '', city = '', state = '', zip = '' } = address
  const addr = [line1, city, state].filter(Boolean).join(', ')

  return [addr, zip].filter(Boolean).join(' ')
}

/**
 * Convert Google Maps `Place` object to an address object
 *
 * @param {Object} place
 * @return {Object}
 */

export function placeToAddress(place) {
  const address = {}
  const formattedPlace = place.structured_formatting || {}

  address.line1 = formattedPlace.main_text || ''

  const restOfAddress = formattedPlace.secondary_text || ''
  const restParts = restOfAddress.split(', ').filter(t => t !== 'USA')

  // Examples:
  // - Santa Cruz, CA, USA
  restParts.forEach(value => {
    if (!address.city) {
      address.city = value
    } else if (!address.state) {
      address.state = value
    }
  })

  return address
}

/**
 * Parse single-line address string.
 *
 * @param {String}
 * @return {Object}
 */

export function fromAddr(str = '') {
  try {
    const parts = str.replace(/, USA|, United States/, '').split(', ')
    const lastPart = parts.splice(parts.length - 1, 1) || ['']
    const lastParts = lastPart[0].split(' ')
    const [state, zip] = lastParts

    return {
      line1: parts[0] || '',
      city: parts[1] || '',
      state,
      zip
    }
  } catch (err) {
    reportError(err)
    return null
  }
}

/**
 * Parse query string for address.
 *
 * @param {String}
 * @return {Object}
 */

export function getQueryAddress() {
  const addr = getQueryParam('addr') || getQueryParam('address')

  if (addr) {
    const address = fromAddr(addr)

    if (address) {
      return Object.assign({ _fromQuery: true }, address)
    }
  }

  const line1 = getQueryParam('street_address') || getQueryParam('line1')
  const city = getQueryParam('city')
  const state = getQueryParam('state_abbr') || getQueryParam('state')
  const zip = getQueryParam('zip_5') || getQueryParam('zip')

  if (line1 && city && state && zip) {
    return {
      line1,
      city,
      state,
      zip,
      _fromQuery: true
    }
  }

  return null
}

<<<<<<< HEAD
/**
 * Parse query string for address.
 *
 * @param {String}
 * @return {Object}
 */

export function getQueryAddress() {
  const s = new URLSearchParams(window.location.search)

  const line1 = s.get('street_address')
  const city = s.get('city')
  const state = s.get('state_abbr')
  const zip = s.get('zip_5')

  if(line1 && city && state && zip){
    return {
      line1,
      city,
      state,
      zip
    }
  }

  return null
}

=======
>>>>>>> 69270f70d4384f7a704f71605b83e9bafdc76a29
export default { fromAddr, toAddr, placeToAddress, getQueryAddress }
