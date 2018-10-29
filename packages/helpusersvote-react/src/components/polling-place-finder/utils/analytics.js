import AEvent from 'analytics-event'
import { getQueryParam } from './url'
import { reportError } from './errors'
import { sendEvents } from './network'

const batch = []
const EVENT_BATCH_SIZE = 10
const EVENT_BATCH_INTERVAL = 2000 // 2 seconds

let isListeningForEvents

export function listenForEvents() {
  if (isListeningForEvents) {
    return
  }

  isListeningForEvents = true

  setInterval(async () => {
    try {
      const batchToSend = batch.splice(0, EVENT_BATCH_SIZE)

      await sendEvents(batchToSend)
    } catch (err) {
      // Silence errors from analytics
    }
  }, EVENT_BATCH_INTERVAL)
}

export function track(input) {
  if (!input.context) {
    const campaign = getUTM()

    if (campaign) {
      input.context = {
        campaign
      }
    }
  }

  const event = AEvent(input)

  batch.push(event)

  if (typeof ga !== 'undefined') {
    if (event.name === 'Page Viewed' && shouldSendToGA(event)) {
      gaPage(event)
    }
  }
}

// alias for clearer naming
export const trackEvent = track

export function trackPageview(input = {}) {
  try {
    const context = {}
    const properties = input.properties || {}
    const campaign = getUTM()

    if (campaign) {
      context.campaign = campaign
    }

    const title = input.name || document.title
    const path = input.path || window.location.pathname
    const url = input.url || window.location.href

    if (title) {
      properties.title = title
    }

    if (path && !properties.path) {
      properties.path = path
    }

    if (url && !properties.url) {
      properties.url = url
    }

    track({
      name: 'Page Viewed',
      properties,
      context
    })
  } catch (err) {
    reportError(err)
  }
}

export function gaPage(event) {
  const payload = {}
  const { properties = {}, context = {} } = event
  const { campaign = {} } = context

  payload.title = properties.title || ''
  payload.page = properties.path || ''

  if (campaign.name) payload.campaignName = campaign.name
  if (campaign.source) payload.campaignSource = campaign.source
  if (campaign.medium) payload.campaignMedium = campaign.medium
  if (campaign.content) payload.campaignContent = campaign.content
  if (campaign.term) payload.campaignKeyword = campaign.term

  ga('send', 'pageview', payload)
}

// Analytics utilities

let blockGA = false

export function turnOffGA() {
  blockGA = true
}

function shouldSendToGA(event) {
  // Manual override to avoid double reporting
  if (blockGA) {
    return false
  }

  const { integrations = {} } = event

  if (typeof integrations['ga'] !== 'undefined') {
    return integrations['ga']
  }

  return true
}

const utmParams = [
  { param: 'utm_campaign', key: 'name' },
  'utm_term',
  'utm_medium',
  'utm_source',
  'utm_content'
].map(param => {
  if (typeof param === 'string') {
    return {
      param,
      key: param.replace('utm_', '')
    }
  } else {
    return param
  }
})

function getUTM() {
  try {
    const campaign = {}
    let utmEmpty = true

    utmParams.forEach(({ param, key }) => {
      if (getQueryParam(param)) {
        campaign[key] = getQueryParam(param)
      }
    })

    if (utmEmpty) {
      return null
    }

    return campaign
  } catch (err) {
    // Silence error
    return null
  }
}
