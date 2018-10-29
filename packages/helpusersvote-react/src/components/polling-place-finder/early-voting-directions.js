import React from 'react'
import Day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { shouldShowCTA } from '@helpusersvote/logic'
import { ElectionDayCTA } from './stateless/election-day'
import PollingPlaceNotFound from './stateless/not-found'
import Switcher from './stateless/switcher'
import GoogleReportForm from './stateless/google-report-form'
import { getMapImages, toAddr } from './utils'

Day.extend(relativeTime)

export function EarlyVotingDirections({
  address: backupAddress,
  voterInfo,
  className,
  queryParams,
  onChangeAddress,
  onSwitchToPollingPlace
}) {
  const address = voterInfo.address || backupAddress
  const { earlyVotingTimeLeft, earlyLocations: locations } = voterInfo

  if (locations && locations.length === 0) {
    const descriptionContent = (
      <React.Fragment>
        We couldn&rsquo;t find your early voting location. Please contact your{' '}
        <a
          className="dib link blue underline-hover pointer"
          href="https://www.usvotefoundation.org/vote/eoddomestic.htm"
        >
          local election office
        </a>{' '}
        to see if there is an early voting location we missed.
      </React.Fragment>
    )

    return (
      <PollingPlaceNotFound
        title="No early voting locations found"
        address={address}
        voterInfo={voterInfo}
        queryParams={queryParams}
        description={descriptionContent}
        onChangeAddress={onChangeAddress}
      />
    )
  }

  const location = locations[0] || {}
  const userAddr = toAddr(address)
  const pollAddr = toAddr(location.address || {})

  const directionsURL = [
    'https://maps.google.com?saddr=',
    encodeURIComponent(userAddr),
    '&daddr=',
    encodeURIComponent(pollAddr)
  ].join('')

  const mapImages = getMapImages({
    userAddr,
    pollAddr
  })

  const isElectionDay = queryParams.election || shouldShowCTA()

  return (
    <div className={`mt3 w-100 ${className || ''}`}>
      <div className="mt1 mb2">
        Only <span className="blue fw5">{earlyVotingTimeLeft} left</span> to
        vote early, you can vote early and skip the lines on Election Day:
      </div>

<<<<<<< HEAD
      <div className="mt2 f5-ns f6 gray">
        Or vote on Election Day —{' '}
        <a
          className="link blue underline-hover pointer"
          href="https://www.vote.org/polling-place-locator/"
          target="_blank"
        >
          find your polling place
        </a>
        .
      </div>
=======
      <Switcher
        active="early"
        earlyVotingTimeLeft={earlyVotingTimeLeft}
        onSwitchToPollingPlace={onSwitchToPollingPlace}
      />
>>>>>>> 69270f70d4384f7a704f71605b83e9bafdc76a29

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
                      href={directionsURL}
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
                    {location.hoursToday && (
                      <div>
                        <div className="ml2 fr fw6">
                          {location.hoursToday.start}
                          {' - '}
                          {location.hoursToday.end}
                        </div>
                        <div className="fw6 directions-date">Open today</div>
                      </div>
                    )}
                    {!location.hoursToday &&
                      !location.hoursParseFail &&
                      location.fallbackHours && (
                        <div className="red fw6 directions-date">
                          Closed today
                        </div>
                      )}
                    {!location.hoursParseFail &&
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
                      !location.groupedDates.length &&
                      location.fallbackHours && (
                        <div>No upcoming early voting hours</div>
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
              <a
                className="directions-map dn db-ns"
                href={directionsURL}
                target="_blank"
                style={{
                  backgroundImage: `url('${mapImages.large}')`
                }}
              />
              <a
                className="directions-map db dn-ns"
                href={directionsURL}
                target="_blank"
              >
                <img src={mapImages.small} />
              </a>
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

export default EarlyVotingDirections
