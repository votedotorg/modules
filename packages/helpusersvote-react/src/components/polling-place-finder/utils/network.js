import fetch from 'isomorphic-fetch'
import { toAddr } from './address'
import { reportError } from './errors'
import { CIVIC_INFO_API_KEY, EVENTS_API_HOST } from './settings'

export function fetchVoterInfo({ address }) {
  const shouldUseGoogleApi = true
  const req = shouldUseGoogleApi
    ? getCivicInfoApiRequest({ address })
    : getDefaultInfoApiRequest({ address })

  return req
}

export function sendEvents(events) {
  if (!events || events.length === 0) {
    return Promise.resolve()
  }

  return fetch(`${EVENTS_API_HOST}/v1/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ events })
  })
}

function getDefaultInfoApiRequest() {
  return fetch('/api/info/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address })
  })
    .then(r => r.json())
    .then(d => d.voterInfo)
}

const electionId = 6000 // 2018 U.S. Midterms
const googleCivicInfoApiHost =
  process.env.CIVIC_INFO_API_HOST ||
  'https://content.googleapis.com/civicinfo/v2/voterinfo'

function getCivicInfoApiRequest({ address }) {
  const addr = toAddr(address)
  const url = `${googleCivicInfoApiHost}?key=${CIVIC_INFO_API_KEY}&electionId=${electionId}&returnAllAvailableData=true&address=${encodeURIComponent(
    addr
  )}`

  return fetch(url)
    .then(r => r.json())
    .catch(reportError)
}

export default {
  fetchVoterInfo
}
