import _ from 'lodash'
import { generateSignature } from './maps-sign'
import { GMAPS_API_KEY, GMAPS_API_SIGNATURE_SECRET } from './settings'

export function getMapImages(opts = {}) {
  const key = `&key=${GMAPS_API_KEY}`
  const { userAddr, pollAddr } = opts
  const markers = `&markers=icon:https://i.imgur.com/GyWhTdV.png%7C${encodeURIComponent(
    userAddr
  )}&markers=color:red%7C${encodeURIComponent(pollAddr)}`

  function signMapsURL(size) {
    const path = `/maps/api/staticmap?scale=2&${size}${markers}${key}&style=feature:poi|visibility:off`

    const pathParts = [path]

    if (GMAPS_API_SIGNATURE_SECRET) {
      const signature = generateSignature(path, GMAPS_API_SIGNATURE_SECRET)

      pathParts.push(`signature=${signature}`)
    }

    return `https://maps.googleapis.com${pathParts.join('&')}`
  }

  return {
    small: signMapsURL(`size=370x200`),
    large: signMapsURL(`size=550x425`)
  }
}

const GMAPS_SCRIPT_TIMEOUT = 10000 // 10 seconds
const timeoutSeconds = GMAPS_SCRIPT_TIMEOUT / 1000

export function loadGmaps() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(
        new Error(`huv.loadGmaps: script took longer than ${timeoutSeconds}s`)
      )
    }, GMAPS_SCRIPT_TIMEOUT)

    // Check if google maps has already been loaded on the page
    if (document.getElementById('huv-gmaps')) {
      resolve({ ok: true, alreadyLoaded: true })
      return
    }

    // now load the Google Maps API by shoving it in a script node
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement('script')

    scriptElement.id = 'huv-gmaps'
    scriptElement.onload = () => resolve({ ok: true })
    scriptElement.onerror = err => reject(err)
    scriptElement.type = 'text/javascript'
    scriptElement.src = `https://maps.googleapis.com/maps/api/js?language=en&libraries=places&key=${GMAPS_API_KEY}`

    head.appendChild(scriptElement)
  })
}

export function fetchAutocompletePlaces(opts = {}) {
  const { input = '' } = opts
  const gclient = getGoogleClient()
  const AutocompleteService = _.get(gclient, 'maps.places.AutocompleteService')

  if (!AutocompleteService) {
    console.error(
      new Error('huv.gmaps: no autocomplete service found'),
      gclient
    )
  }

  if (!input) {
    return Promise.resolve([])
  }

  const svc = new AutocompleteService()
  const req = {
    input,
    componentRestrictions: { country: 'us' }
  }

  return new Promise((resolve, reject) => {
    svc.getPlacePredictions(req, (results, status) => {
      if (status !== 'OK' && status !== 'ZERO_RESULTS') {
        return reject(
          new Error(`huv.gmaps.getPlacePredictions: ${status} status`)
        )
      }

      resolve(results || [])
    })
  })
}

export function fetchGeocoding(opts = {}) {
  const { address = {} } = opts
  const gclient = getGoogleClient()
  const Geocoder = _.get(gclient, 'maps.Geocoder')

  if (!Geocoder) {
    console.error(
      new Error('huv.gmaps.geocode: no geocoder service found'),
      gclient
    )
    return Promise.resolve([])
  }

  if (!address) {
    return Promise.resolve([])
  }

  const svc = new Geocoder()
  const req = {
    address
  }

  return new Promise((resolve, reject) => {
    svc.geocode(req, (results, status) => {
      if (status !== 'OK' && status !== 'ZERO_RESULTS') {
        return reject(new Error(`huv.gmaps.geocode: ${status} status`))
      }

      resolve(results || [])
    })
  })
}

export function getGoogleClient() {
  return global.google
}

export default {
  fetchGeocoding,
  fetchAutocompletePlaces,
  getGoogleClient,
  getMapImages,
  loadGmaps
}
