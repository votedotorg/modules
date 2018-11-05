import React from 'react'
import Day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { shouldShowCTA, getState } from '@helpusersvote/logic'
import { ElectionDayCTA } from './stateless/election-day'
import EarlyNotFound from './stateless/early-not-found'
import Switcher from './stateless/switcher'
import { DirectionsMap } from './stateless/directions'
import GoogleReportForm from './stateless/google-report-form'
import { toAddr } from './utils'

Day.extend(relativeTime)

function EarlyLocationSelect({ earlyLocations, currentValue, onSelect }) {
  return (
    <div className="dib huv-select-container huv-select--small">
      <select
        className="huv-button"
        onChange={e => onSelect(parseInt(e.target.value))}
        style={{ minWidth: 140, height: 27, lineHeight: '27px' }}
      >
        {earlyLocations.map((loc, index) => (
          <option key={index} value={index}>
            {(loc.selectText || '').trim()}
          </option>
        ))}
      </select>
    </div>
  )
}

export function EarlyVotingDirections({
  locationSelectIndex,
  address: backupAddress,
  voterInfo,
  className,
  queryParams,
  useGroupedDates,
  onChangeAddress,
  onLocationSelectIndex,
  onSwitchToPollingPlace
}) {
  const address =
    voterInfo.address && voterInfo.address.line1
      ? voterInfo.address
      : backupAddress
  const { earlyVotingTimeLeft, earlyLocations: locations } = voterInfo

  if (locations && locations.length === 0) {
    const descriptionContent = <NotFoundDescription state={address.state} />

    return (
      <div className={`pt3 w-100 ${className || ''}`}>
        <div className="mt1 mb2">
          Early voting has passed, you can find your polling place to vote on
          Election Day:
        </div>

        <Switcher
          active="early"
          earlyVotingTimeLeft={earlyVotingTimeLeft}
          onSwitchToPollingPlace={onSwitchToPollingPlace}
        />

        <EarlyNotFound
          address={address}
          voterInfo={voterInfo}
          queryParams={queryParams}
          description={descriptionContent}
          onChangeAddress={onChangeAddress}
          onSwitchToPollingPlace={onSwitchToPollingPlace}
        />
      </div>
    )
  }

  const location = locations[parseInt(locationSelectIndex || 0)] || {}
  const userAddr = toAddr(address)
  const pollAddr = toAddr(location.address || {})

  const directionsHref = [
    'https://maps.google.com?saddr=',
    encodeURIComponent(userAddr),
    '&daddr=',
    encodeURIComponent(pollAddr)
  ].join('')

  const isElectionDay = queryParams.election || shouldShowCTA()

  return (
    <div className={`pt3 w-100 ${className || ''}`}>
      {!voterInfo.isEarlyVotingOver ? (
        <div className="mt1 mb2">
          Only <span className="blue fw5">{earlyVotingTimeLeft} left</span> to
          vote early, you can vote early and skip the lines on Election Day:
        </div>
      ) : (
        <div className="mt1 mb2">
          Early voting has passed, you can find your polling place to vote on
          Election Day:
        </div>
      )}

      <div className="flex-ns flex-wrap justify-between">
        <Switcher
          active="early"
          earlyVotingTimeLeft={earlyVotingTimeLeft}
          onSwitchToPollingPlace={onSwitchToPollingPlace}
        />

        {voterInfo.earlyLocations &&
          voterInfo.earlyLocations.length > 1 && (
            <EarlyLocationSelect
              onSelect={onLocationSelectIndex}
              currentValue={locationSelectIndex}
              earlyLocations={voterInfo.earlyLocations}
            />
          )}
      </div>

      {locations.length && (
        <div className="outdent">
          <div className="directions mt3 flex-ns flex-row-ns">
            <div className="directions-info directions-info--early w-40-l w-50-m flex-ns flex-column justify-between">
              <div className="flex-auto-ns">
                <div>
                  <div className="directions-label">
                    Location&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                    <a
                      className="fw5 link blue underline-hover"
                      href={directionsHref}
                      target="_blank"
                    >
                      Get Directions
                    </a>
                  </div>
                  <div className="directions-address">
                    <div className="directions-address-line1">
                      {location.address.line1}
                    </div>
                    <div>
                      {location.address.city}, {location.address.state}{' '}
                      {location.address.zip}
                    </div>
                  </div>
                  {location.notes && <div>{location.notes}</div>}
                  {location.dropoffLocation && (
                    <div>
                      {location.dropoffLocationOnly ? 'Only' : 'Also'} a mail
                      ballot dropoff location
                    </div>
                  )}
                  <div className="directions-hours mt3">
                    <div className="directions-label pb1">Hours</div>
                    {!voterInfo.isEarlyVotingOver &&
                      location.hoursToday && (
                        <div>
                          <div className="ml2 fr fw6">
                            {location.hoursToday.start}
                            {' - '}
                            {location.hoursToday.end}
                          </div>
                          <div className="fw6 directions-date">
                            {location.isClosed ? (
                              'Open today'
                            ) : (
                              <span className="red fw5">Closed now</span>
                            )}
                          </div>
                        </div>
                      )}
                    {!voterInfo.isEarlyVotingOver &&
                      !location.hoursToday &&
                      !location.hoursParseFail &&
                      location.fallbackHours && (
                        <div className="red fw6 directions-date">
                          Closed today
                        </div>
                      )}
                    {voterInfo.isEarlyVotingOver && (
                      <div className="red fw6 directions-date">Closed now</div>
                    )}
                    {!location.hoursParseFail &&
                      useGroupedDates &&
                      location.groupedDates.map((dateRange, index) => (
                        <div key={index} className="f7 mt1">
                          <div>
                            <div className="ml2 fr">
                              {dateRange.start}—{dateRange.end}
                            </div>
                            <div className="directions-date">
                              {dateRange.endDate != dateRange.startDate && (
                                <div>
                                  {dateRange.startDateFormatted}
                                  {' - '}
                                  {dateRange.endDateFormatted}
                                </div>
                              )}
                              {dateRange.endDate === dateRange.startDate && (
                                <div>{dateRange.startDateFormatted}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    {!location.hoursParseFail &&
                      !useGroupedDates &&
                      location.hoursPerDate &&
                      location.hoursPerDate.map(({ date, hours }, index) => (
                        <div key={index} className="f7 mt1">
                          <div>
                            <div className="ml2 fr">{hours}</div>
                            <div className="directions-date">{date}</div>
                          </div>
                        </div>
                      ))}

                    {!location.hoursParseFail &&
                      !location.groupedDates.length &&
                      location.fallbackHours && (
                        <small>No upcoming early voting hours</small>
                      )}
                    {!location.hoursParseFail &&
                      !location.groupedDates.length &&
                      !location.fallbackHours && (
                        <div>
                          No hours information available for this location
                        </div>
                      )}
                    {location.hoursParseFail && (
                      <div
                        className="directions-hours mt3"
                        style={{ fontSize: 12, whiteSpace: 'pre-line' }}
                      >
                        {location.fallbackHours}
                      </div>
                    )}
                  </div>
                  <ElectionDayCTA
                    isElectionDay={isElectionDay}
                    onClick={onSwitchToPollingPlace}
                  />
                </div>
              </div>
              <div className="dn db-ns">
                <div className="mt3 directions-label">
                  Your Address&nbsp;&nbsp;&middot;&nbsp;
                  <a
                    className="fw5 link blue underline-hover pointer"
                    onClick={onChangeAddress}
                  >
                    Change
                  </a>
                </div>
                <div>{address.line1}</div>
                <div>
                  {address.city}, {address.state} {address.zip}
                </div>
              </div>
            </div>
            <div className="directions-container relative flex-auto-ns">
              <DirectionsMap
                userAddr={userAddr}
                pollAddr={pollAddr}
                directionsHref={directionsHref}
              />
            </div>
            <div className="directions-info dn-ns">
              <div className="mt3">
                <div className="directions-label">
                  Your Address&nbsp;&nbsp;&middot;&nbsp;
                  <a
                    className="fw5 link blue underline-hover pointer"
                    onClick={onChangeAddress}
                  >
                    Change
                  </a>
                </div>
                <div>{address.line1}</div>
                <div>
                  {address.city}, {address.state} {address.zip}
                </div>
              </div>
            </div>
          </div>
          <div className="cf mt1" style={{ fontSize: 12 }}>
            <div className="fr">
              <GoogleReportForm address={address} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NotFoundDescription({ state = '' }) {
  if (getState(state).abbr === 'NJ') {
    return (
      <React.Fragment>
        Early voting is available at your{' '}
        <a
          className="dib link blue underline-hover pointer"
          href="https://www.state.nj.us/state/elections/voting-information-local-officials.html"
          target="_blank"
        >
          County Clerk&rsquo;s office
        </a>
        . Please contact your clerk for hours and information.
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      We couldn&rsquo;t find any open early voting locations. Please contact
      your{' '}
      <a
        className="dib link blue underline-hover pointer"
        href="https://www.usvotefoundation.org/vote/eoddomestic.htm"
        target="_blank"
      >
        local election office
      </a>{' '}
      to see if there is an early voting location we missed.
    </React.Fragment>
  )
}

EarlyVotingDirections.defaultProps = {
  useGroupedDates: false
}

export default EarlyVotingDirections
