import dataUriToBuffer from 'data-uri-to-buffer'
import lruCache from 'lru-cache'
import QRCode from 'qrcode'
import Jimp from 'jimp'

function createImageFromDataUri(dataUri) {
  return new Promise(res => {
    new Jimp(dataUriToBuffer(dataUri), (err, img) => {
      // eslint-disable-line
      if (err) throw err
      res(img)
    })
  })
}

function createQRCode(data, opt = { errorCorrectionLevel: 'M', margin: 2 }) {
  // FIXME: it works. But it could be more efficient.
  // The npm qrcode module cannot output just a buffer.
  // So we need to pass through base64 encoding.
  // To fix this, we need to create a PR on qrcode to support output as a buffer.
  return new Promise(res => {
    QRCode.toDataURL(data, opt, (err, response) => {
      if (err) throw err
      res(createImageFromDataUri(response))
    })
  })
}

// TODO: Configurable cache params
export const cacheLogo = cachePromise()
export const cacheLogoResized = cachePromise()

function fetchLogo(logoPath) {
  return Jimp.read(logoPath)
}

function resizeSquared(img, _w, _h) {
  let w
  let h

  if (_h > _w) {
    w = Jimp.AUTO
    h = _h
  } else {
    w = _w
    h = Jimp.AUTO
  }
  return img.resize(w, h)
}

function getResizedLogo({ path, w, h, ignoreCache = false }) {
  if (ignoreCache) {
    return fetchLogo(path).then(img => resizeSquared(img, w, h))
  }

  const resizedLogoKey = `${w}x${h}-${path}`
  return cacheLogoResized.getAsync(resizedLogoKey, async () => {
    const logoFullImg = await cacheLogo.getAsync(path, () => fetchLogo(path))
    return resizeSquared(logoFullImg.clone(), w, h)
  })
}

export async function generateQR({ text, path, opt, ignoreCache, ratio = 2 }) {
  const img = await createQRCode(text, opt)
  const logo = await getResizedLogo({
    path,
    w: Math.floor(img.bitmap.width / ratio),
    h: Math.floor(img.bitmap.height / ratio),
    ignoreCache
  })

  // Center the logo
  const x = Math.floor((img.bitmap.width - logo.bitmap.width) / 2)
  const y = Math.floor((img.bitmap.height - logo.bitmap.height) / 2)

  // Apply on the QRCode
  const qrImg = img.composite(logo, x, y)

  return new Promise((res, rej) => {
    qrImg.getBuffer(Jimp.MIME_PNG, (err, buf) => {
      if (err) return rej(err)
      return res(buf)
    })
  })
}

const STATUS = {
  initialized: 'initialized',
  fetching: 'fetching',
  fetched: 'fetched',
  fetchFailed: 'fetch failed'
}

class CacheItem {
  constructor(opts) {
    this.key = opts.key
    this.value = opts.value
    this.fetchFunction = opts.fetchFunction
    this.init()
  }

  init(status = STATUS.initialized) {
    this.status = status
    this.resolvers = []
    this.rejectors = []
    return this.rejectors
  }

  fetch() {
    return Promise.resolve().then(() => {
      if (this.status === STATUS.fetchFailed) {
        this.init()
      }
      if (this.status === STATUS.fetched || !this.fetchFunction) {
        // Return the current value
        return this.value
      }
      // Add a promise to the list of promises awaiting fetch completion
      const p = new Promise((resolve, reject) => {
        this.resolvers.push(resolve)
        return this.rejectors.push(reject)
      })
      if (this.status === STATUS.initialized) {
        // Call the fetch function
        this.status = STATUS.fetching
        Promise.resolve()
          .then(() => this.fetchFunction(this.key))
          .then(value => {
            this.value = value
            this.status = STATUS.fetched
            const ref = this.resolvers
            const results = []
            for (let i = 0, len = ref.length; i < len; i++) {
              const r = ref[i]
              results.push(r(value))
            }
            this.init(this.status)
            return results
          })
          .catch(err => {
            this.status = STATUS.fetchFailed
            const ref = this.rejectors
            const results = []
            for (let i = 0, len = ref.length; i < len; i++) {
              const r = ref[i]
              results.push(r(err))
            }
            this.init(this.status)
            return results
          })
      }
      return p
    })
  }
}

function cachePromise(opts) {
  const cache = lruCache(opts)
  cache.getAsync = function getAsync(key, fetchFunction) {
    let item
    item = cache.get(key)
    if (item === undefined && fetchFunction) {
      // Create a new cache item
      item = new CacheItem({
        key,
        fetchFunction
      })
      cache.set(key, item)
    }
    if (!(item instanceof CacheItem)) {
      return Promise.resolve(item)
    }
    return item.fetch()
  }
  return cache
}

export default generateQR
