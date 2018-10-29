import _ from 'lodash'
import to from 'to-case'
import time from 'time-js'
import moment from 'moment'
import EARLY_VOTING from './early-voting.json'
import { getStates } from '@helpusersvote/logic'
import naturalCompare from 'string-natural-compare'

/**
 * The "main" parties that people know, that should be emphasized first in cases
 * where a single candidate appears in multiple parties on the ballot.
 *
 * @type {Array}
 */

const MAIN_PARTIES = [
  'Democratic Party',
  'Green Party',
  'Libertarian Party',
  'Republican Party',
  // A few edge cases where the parties are named differently in some states.
  'Democratic-NPL Party',
  'Democratic-Farmer-Labor Party'
]

/**
 * A list of state abbreviation strings.
 *
 * @type {Array}
 */

const STATE_ABBREVIATIONS = getStates().map(s => s.name)

/**
 * A regex that matches state abbreviations at the start of a string followed by
 * a space character.
 *
 * @type {RegExp}
 */

const STATE_PREFIX_MATCHER = new RegExp(
  `^(${STATE_ABBREVIATIONS.join('|')})\\s`
)

export default {
  normalizeLocation,
  normalizeVoterInfo
}

/**
 * Normalize the voter info returned by the Civic API.
 *
 * @param {Object} info
 * @return {Object}
 */

export function normalizeVoterInfo(info) {
  var data = {
    earlyLocations: [],
    generals: [],
    locations: [],
    referendums: []
  }

  data.address = normalizeAddress(info.normalizedInput)

  // If there are contests, split them into general and referendums.
  if (info.contests) {
    data.generals = info.contests
      .filter(c => c.type == 'General')
      .map(normalizeGeneral)

    data.referendums = info.contests
      .filter(c => c.type == 'Referendum')
      .map(normalizeReferendum)
      .sort((a, b) => naturalCompare(a.title, b.title))
  }

  // If there are early voting sites, normalize them.
  if (info.earlyVoteSites) {
    var locations = _.chain(info.earlyVoteSites)
      .map(l => normalizeLocation(l, { parseHours: true }))
      .sortBy(l => (l.hasHoursToday ? 1 : 2))
      .value()

    data.earlyLocations = locations
  }

  // If dropoffs
  if (info.dropOffLocations) {
    var locations = _.chain(info.earlyVoteSites)
      .map(l => normalizeLocation(l, { parseHours: true, dropOff: true }))
      .filter(function(l) {
        return !_.filter(data.earlyLocations || [], function(ev) {
          var match =
            ev.address &&
            l.address &&
            ev.address.line1 === l.address.line1 &&
            ev.fallbackHours === l.fallbackHours
          if (match) {
            ev.dropoffLocation = true
          }
          return match
        }).length
      })
      .each(function(l) {
        l.dropOffLocationOnly = true
      })
      .sortBy(l => (l.hasHoursToday ? 1 : 2))
      .value()

    data.earlyLocations = data.earlyLocations.concat(locations)
  }

  var earlyVoting = EARLY_VOTING[data.address.state]

  if (earlyVoting) {
    data.earlyVotingSameDayReg = earlyVoting.same_day_reg
    data.earlyVotingSameDayRegNote = earlyVoting.same_day_reg_note
    data.earlyVotingWhoIsEligible = earlyVoting.who
    data.earlyVotingStartDate = earlyVoting.starts_at
    // remove tz info that was added
    var ends_at = earlyVoting.ends_at.slice(0, 10)
    data.earlyVotingEndDate = ends_at
    // Assume polls close at 5pm
    var ends = moment(ends_at)
    if (ends.get('hour') == 0) {
      ends = ends.set('hour', earlyVoting.ends_at_time || 17)
    }
    data.earlyVotingEndDateTime = ends
  }

  if (data.earlyLocations.length > 0) {
    data.earlyVotingStartDate = _.minBy(
      data.earlyLocations,
      l => l.startDate
    ).startDate
    data.earlyVotingEndDate = _.maxBy(
      data.earlyLocations,
      l => l.endDate
    ).endDate
    var lastPollingStationOpen = _.maxBy(
      data.earlyLocations,
      l => l.endDateTime
    )
    data.earlyVotingEndDateTime = lastPollingStationOpen
      ? lastPollingStationOpen.endDateTime
      : null
  }

  if (info.pollingLocations) {
    data.locations = info.pollingLocations.map(normalizeLocation)
  }

  return data
}

/**
 * Normalize a general `contest`.
 *
 * @param {Object} contest
 * @return {Object}
 */

function normalizeGeneral(contest) {
  contest.office = normalizeOffice(contest.office)

  // De-duplicate candidates, and group parties into an array.
  if (contest.candidates) {
    var cache = {}
    var candidates = []

    contest.candidates.forEach(c => {
      var party = c.party
      var name = c.name.replace('/', ' & ')
      var cached = cache[name]
      var candidate = cached ? cached : { name, parties: c.parties || [] }

      // Add a unique key.
      candidate.key = encodeURIComponent(name)

      // Add the parties in the correct order, priotizing common ones.
      if (party) {
        if (~MAIN_PARTIES.indexOf(party)) {
          candidate.parties.unshift(party)
        } else {
          candidate.parties.push(party)
        }
      }

      if (~name.indexOf(' & ')) {
        const names = name.split(' & ')
        candidate.names = names
      }

      if (!cached) {
        candidates.push(candidate)
        cache[name] = candidate
      }
    })

    // Sort the candidates, putting the common parties up top.
    candidates = _.sortBy(candidates, candidate => {
      var { parties } = candidate
      if (~parties.indexOf('Democratic Party')) return 1
      if (~parties.indexOf('Republican Party')) return 1
      if (~parties.indexOf('Green Party')) return 2
      if (~parties.indexOf('Libertarian Party')) return 2
      if (parties.length) return 3
      return 4
    })

    contest.candidates = candidates
  }

  return contest
}

/**
 * Normalize a contest `office` name string.
 *
 * @param {String} office
 * @return {String}
 */

function normalizeOffice(office) {
  if (!office) return null

  // Make the separator more readable.
  office = office.replace('/', ' & ')

  // Try to match a state abbreviation at the start of the string.
  var match = office.match(STATE_PREFIX_MATCHER)
  var abbr = match ? match[1] : null
  var state = abbr ? states[abbr] : null
  var name = state ? state.name : null
  if (name) office = name + office.slice(2)

  return office
}

/**
 * Normalize a referendum `contest`.
 *
 * @param {Object} contest
 * @return {Object}
 */

function normalizeReferendum(contest) {
  // Add a unique key.
  contest.title = contest.referendumTitle
  contest.key = encodeURIComponent(contest.referendumTitle)

  // Fix weird characters in the referendum text.
  if (contest.referendumText) {
    contest.text = contest.referendumText.replace(/�/g, ' ')
  }

  if (contest.text && isUpperCase(contest.text)) {
    contest.text = to.title(contest.text)
  }

  // Add a truncated excerpt of the referendum text.
  if (contest.text && contest.text.length > 100) {
    contest.shortExcerpt = contest.text.slice(0, 80) + '…'
    contest.longExcerpt = contest.text.slice(0, 140) + '…'
  }

  // Try splitting out fiscal impact from the referendum text.
  if (contest.text) {
    var parts = contest.text.split(' Fiscal Impact:')

    if (parts.length > 1) {
      contest.text = parts[0]
      contest.fiscalImpact = parts[parts.length - 1]
    }
  }

  // Sometimes a "brief" is returned instead of a "subtitle".
  if (contest.referendumSubtitle || contest.referendumBrief) {
    var subtitle = contest.referendumSubtitle || contest.referendumBrief
    if (to(subtitle) === 'upper') {
      subtitle = to.title(subtitle)
    }
    subtitle = addNbsp(subtitle)
    contest.subtitle = subtitle
  }

  return contest
}

/**
 * Normalize a voting `location`.
 *
 * @param {Object} location
 * @param {Object} options
 *   @property {Boolean} parseHours
 * @return {Object}
 */

export function normalizeLocation(location, options = {}) {
  var { startDate, endDate, address, notes } = location

  // Normalize the location's address.
  address = normalizeAddress(address)

  // Parse the hours from the raw string.
  var hours = []
  var fallbackHours = location.pollingHours
  var hoursParseFail = false
  var hoursToday = null
  var hoursTomorrow = null
  var endDateTime = null

  if (location.pollingHours) {
    if (options.parseHours) {
      hours = parseHours(location.pollingHours)

      if (location.pollingHours && !hours.length) {
        hoursParseFail = true
      } else {
        endDateTime = _.maxBy(hours, h => h.endDateTime).endDateTime
        hours = futureHours(hours)
        hoursToday = getHoursToday(hours)
        hoursTomorrow = getHoursTomorrow(hours)
      }
    } else {
      hours = location.pollingHours
    }
  }

  // Group polling dates by hours
  var groupedDates = groupHoursByDate(hours)
  groupedDates = normalizeDateRange(groupedDates)

  // Select dropdown text
  var selectText = `${address.line1} ${
    !hoursToday && !hoursParseFail ? '(Closed today)' : ''
  }`

  if (options.dropOff) {
    selectText += ' (Drop-off)'
  }

  return {
    startDate,
    endDate,
    endDateTime,
    address,
    selectText,
    notes,
    hours,
    fallbackHours,
    groupedDates,
    hoursParseFail,
    hoursToday,
    hoursTomorrow,
    hasHoursToday: !!hoursToday,
    hasHoursTomorrow: !!hoursTomorrow,
    dropOffLocation: !!options.dropOff
  }
}

/**
 * Normalize an `address` object.
 *
 * @param {Object} address
 * @return {Object}
 */

function normalizeAddress(address) {
  // Normalize the first address line.
  address.line1 = normalizeLine1(address.line1)

  // Create an English-formatted version of the address.
  address.text = getAddressText(address)

  // Create a URL-encoded version of the address.
  address.encoded = encodeURIComponent(address.text)

  return address
}

/**
 * Render single-line address string.
 *
 * @param {Object} address
 * @return {String}
 */

function getAddressText(address) {
  return `${address.line1}, ${address.city}, ${address.state} ${address.zip}`
}

/**
 * Normalize the first `line` of an address.
 *
 * @param {String} line
 * @return {String}
 */

function normalizeLine1(line) {
  var lastParts = /.*\s(.*)$/.exec(line)

  if (!lastParts) {
    return line
  }

  var last = lastParts[1]
  var length = last.length
  var index = line.length - length

  switch (last) {
    case 'Northeast':
      return `${line.slice(0, index)} NE`
    case 'Northwest':
      return `${line.slice(0, index)} NW`
    case 'Southeast':
      return `${line.slice(0, index)} SE`
    case 'Southwest':
      return `${line.slice(0, index)} SW`
    default:
      return line
  }
}

/**
 * Check if a polling `location` is open.
 *
 * @param {Object} location
 * @return {Object}
 */

function isOpen(location) {
  var date = new Date()
  return (
    location.startDate &&
    location.startDate < date &&
    location.endDate &&
    location.endDate >= date
  )
}

/**
 * Parse an hour description from a `hours` string.
 *
 * @param {String} hours
 * @return {String}
 */

var LINE_MATCHER_1 = /^\s*(\w{3}), (\w{3}) (\d{1,2}): (\d{1,2}(?::\d{2})? (?:am|pm)) - (\d{1,2}(?::\d{2})? (?:am|pm))\s*$/
var LINE_MATCHER_2 = /^\s*(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2} (?:AM|PM)) to (\d{2}:\d{2} (?:AM|PM))\s*$/
var SORTED_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function parseHours(hours) {
  return (
    _.chain(hours.split(/\n|<br>/))

      // Match all of the lines against the regexp.
      .map(line => {
        return line.match(LINE_MATCHER_1) || line.match(LINE_MATCHER_2)
      })

      // Remove any non-matched lines.
      .filter()

      // Convert the matches into their components.
      .map(match => {
        if (match.length == 6) {
          var [original, day, month, date, start, end] = match
          var format = 'h: PM'
          start = time(start).format(format)
          end = time(end).format(format)
          var startHours = moment(start, ['h:m a']).hours()
          var endHours = moment(end, ['h:m a']).hours()
          var isoLocalDate = moment(
            new Date(month + ' ' + date + ', 2018')
          ).format()
          var startDateTime = moment(new Date(month + ' ' + date + ', 2018'))
            .set('hours', startHours)
            .format()
          var endDateTime = moment(new Date(month + ' ' + date + ', 2018'))
            .set('hours', endHours)
            .format()
          return {
            day,
            start,
            end,
            month,
            date,
            isoLocalDate,
            startDateTime,
            endDateTime
          }
        } else {
          var [original, date, start, end] = match
          var format = 'h: PM'
          start = time(start).format(format)
          end = time(end).format(format)
          var startHours = moment(start, ['h:m a']).hours()
          var endHours = moment(end, ['h:m a']).hours()
          var isoLocalDate = moment(date).format()
          var startDateTime = moment(date)
            .set('hours', startHours)
            .format()
          var endDateTime = moment(date)
            .set('hours', endHours)
            .format()
          return {
            day,
            start,
            end,
            month,
            date,
            isoLocalDate,
            startDateTime,
            endDateTime
          }
        }
      })

      // Return the value.
      .value()
  )
}

function futureHours(hours) {
  return _.filter(hours, function(h) {
    return moment() < moment(h.isoLocalDate).add(1, 'days')
  })
}

function getHoursToday(hours) {
  var today = _.filter(hours, function(h) {
    return (
      moment() < moment(h.isoLocalDate).add(1, 'days') &&
      moment() > moment(h.isoLocalDate)
    )
  })
  return today.length ? today[0] : null
}

function getHoursTomorrow(hours) {
  var tmrw = _.filter(hours, function(h) {
    return (
      moment() < moment(h.isoLocalDate).add(2, 'days') &&
      moment() > moment(h.isoLocalDate).add(1, 'days')
    )
  })
  return tmrw.length ? tmrw[0] : null
}

function normalizeDateRange(hours) {
  _.each(hours, function(h) {
    h.startDateFormatted = moment(h.startDate).format('ddd, MMM D')
    h.endDateFormatted = moment(h.endDate).format('ddd, MMM D')
  })
  return hours
}

function groupHoursByDate(hours) {
  // startDate
  // endDate
  // start
  // end
  var groups = []
  var lastHour = null
  _.each(hours, function(h) {
    if (
      lastHour &&
      lastHour.end == h.end &&
      lastHour.start == h.start &&
      // check if subsequent days, while begin/end of daylight savings
      moment(h.isoLocalDate) - moment(lastHour.isoLocalDate) < 1.2 * 86400000
    ) {
      groups[groups.length - 1].endDate = h.isoLocalDate
    } else {
      groups.push({
        startDate: h.isoLocalDate,
        endDate: h.isoLocalDate,
        start: h.start,
        end: h.end
      })
    }
    lastHour = h
  })

  return groups
}

/**
 * Format a `date` with a Moment.js `format` string.
 *
 * @param {Date} date
 * @param {String} format
 * @return {String}
 */

function formatDate(date, format) {
  return moment.utc(date).format(format)
}

/**
 * Replace the last space in a string with a non-breaking space.
 *
 * @param {String} string
 * @return {String}
 */

function addNbsp(string) {
  if (!~string.indexOf(' ')) return string
  var index = string.lastIndexOf(' ')
  return `${string.slice(0, index)}\u00A0${string.slice(index + 1)}`
}

/**
 * Utility that checks if text is ALL CAPS
 *
 * @param {String} text
 * @return {Boolean}
 */
function isUpperCase(str) {
  return str === str.toUpperCase()
}
