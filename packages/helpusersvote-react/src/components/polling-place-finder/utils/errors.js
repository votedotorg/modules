import * as Sentry from '@sentry/browser'
import { SENTRY_DSN } from './settings'

const dsn = SENTRY_DSN
let hasInit

if (dsn) {
  Sentry.init({ dsn })
  hasInit = true
}

export function reportError(error, info) {
  if (!hasInit) {
    if (!dsn) {
      console.warn('huv: could not find `SENTRY_DSN` setting value')
      return
    }

    Sentry.init({ dsn })
  }

  // De-risk error handling
  try {
    if (info) {
      Sentry.withScope(scope => {
        // Attach extra info to Sentry error scope
        Object.keys(info).forEach(k => scope.setExtra(k, info[k]))
        Sentry.captureException(error)
      })
    } else {
      Sentry.captureException(error)
    }
  } catch (err) {
    console.warn('huv: failed reporting to sentry')
    console.log(err)
  }
}

export default { reportError }
