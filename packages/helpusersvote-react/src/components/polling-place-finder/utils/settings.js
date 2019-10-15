function get(key) {
  if (typeof window !== 'undefined') {
    if (window[key]) return window[key]
  }

  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return process.env[key]
  }

  return ''
}

const isProd = get('NODE_ENV') === 'production'

// Defaults
const defaultSentryDSN = isProd ? 'https://57647d17cba9456eb7744c4a1ebafb6d@sentry.io/1767298' : null

const defaultBallotApiHost = isProd
  ? 'https://ballot-api.helpusersvote.com'
  : 'https://ballot-api.staging.helpusersvote.com'

// Exports
export const CIVIC_INFO_API_KEY = get('CIVIC_INFO_API_KEY')
export const GMAPS_API_KEY = get('GMAPS_API_KEY')
export const GMAPS_API_SIGNATURE_SECRET = get('GMAPS_API_SIGNATURE_SECRET')
export const BALLOT_API_HOST = get('BALLOT_API_HOST') || defaultBallotApiHost
export const SENTRY_DSN = get('SENTRY_DSN') || defaultSentryDSN

export default {
  BALLOT_API_HOST,
  CIVIC_INFO_API_KEY,
  GMAPS_API_SIGNATURE_SECRET,
  GMAPS_API_KEY,
  SENTRY_DSN,
  isProd
}
