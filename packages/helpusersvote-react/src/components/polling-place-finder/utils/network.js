import fetch from 'isomorphic-fetch'
import { toAddr } from './address'
import { reportError } from './errors'
import { CIVIC_INFO_API_KEY } from './settings'

export function fetchVoterInfo({ address }) {
  const shouldUseGoogleApi = true
  const req = shouldUseGoogleApi
    ? getCivicInfoApiRequest({ address })
    : getDefaultInfoApiRequest({ address })

  return req
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

const electionId = 10 // 2019 U.S. Midterms
const googleCivicInfoApiHost =
  process.env.CIVIC_INFO_API_HOST ||
  'https://api.ballotinfo.org/voterinfo'

function getCivicInfoApiRequest({ address }) {
  const addr = toAddr(address)
  const url = `${googleCivicInfoApiHost}?key=${CIVIC_INFO_API_KEY}&electionId=${electionId}&returnAllAvailableData=true&address=${encodeURIComponent(
    addr
  )}`

  return fetch(url, {
    method: 'GET',
    mode:'cors',
    headers: {
      'Content-Type': 'text/plain',
      'Sec-Fetch-Mode':'cors',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
    }
  })
    .then(r => r.json())
    .catch(reportError)
}

export default {
  fetchVoterInfo
}
