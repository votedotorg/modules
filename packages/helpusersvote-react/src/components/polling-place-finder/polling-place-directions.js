import _ from 'lodash'
import React from 'react'
import { getState, shouldShowCTA } from '@helpusersvote/logic'
import EARLY_VOTING_DATA from './data/early-voting.json'
import POLLING_PLACE_DATA from './data/polls.json'
import { toAddr } from './utils'

import EarlyVotingCTA from './stateless/early-voting-cta'
import PollingPlaceNotFound from './stateless/not-found'
import LocationAddress from './stateless/location-address'
import GoogleReportForm from './stateless/google-report-form'
import { DirectionsHours, DirectionsMap } from './stateless/directions'
import { ElectionDayNotice } from './stateless/election-day'
import Switcher from './stateless/switcher'
import PlanMaker from '../plan-maker'

export function PollingPlaceDirections({
  children,
  address: backupAddress,
  notFound,
  voterInfo,
  queryParams,
  onChangeAddress,
  onClickDirections,
  onSwitchToEarlyVoting
}) {
  const address =
    voterInfo.address && voterInfo.address.line1
      ? voterInfo.address
      : backupAddress
  const state = getState(address.state)
  const earlyVoting = EARLY_VOTING_DATA[state.abbr] || {}
  const pollingPlace = POLLING_PLACE_DATA[state.abbr] || {}
  const { earlyVotingTimeLeft, earlyLocations, locations = [] } = voterInfo

  if (notFound || (locations && locations.length === 0)) {
    return (
      <PollingPlaceNotFound
        address={address}
        voterInfo={voterInfo}
        queryParams={queryParams}
        onChangeAddress={onChangeAddress}
      />
    )
  }

  const location = locations[0] || { hours: [] }
  const locationAddress = location.address || {}

  const userAddr = toAddr(address)
  const pollAddr = toAddr(location.address)

  const directionsHref = [
    'https://maps.google.com?saddr=',
    encodeURIComponent(userAddr),
    '&daddr=',
    encodeURIComponent(pollAddr)
  ].join('')

  const isElectionDay = queryParams.election || shouldShowCTA()
  const votingDate = isElectionDay ? <b>today</b> : 'on Election Day'

  return (
    <div className="pt3 w-100">
      <div className="mt1 mb2">
        You can vote here {votingDate} from{' '}
        <span className="dib">
          <span className="b">
            {location.hours && location.hours.length > 0
              ? location.hours
              : pollingPlace.hours}
          </span>
          .
        </span>
        <br />
      </div>

      {!isElectionDay && (
        <Switcher
          earlyVotingTimeLeft={earlyVotingTimeLeft}
          onSwitchToEarlyVoting={onSwitchToEarlyVoting}
        />
      )}

      <div className="outdent">
        <div className="directions directions-small mt3 mb1 flex-ns flex-row-ns">
          <div className="directions-info w-40-ns flex-ns flex-column-ns justify-between-ns">
            <div className="flex-auto-ns">
              <div>
                <div className="directions-label">
                  Your Polling Place&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                  <a
                    className="fw5 link blue underline-hover"
                    href={directionsHref}
                    target="_blank"
                  >
                    Get Directions
                  </a>
                </div>
                <LocationAddress
                  className="directions-address1"
                  address={locationAddress}
                />
                <DirectionsHours
                  location={location}
                  pollingPlace={pollingPlace}
                />
                <EarlyVotingCTA
                  isElectionDay={isElectionDay}
                  timeLeft={earlyVotingTimeLeft}
                  onClick={onSwitchToEarlyVoting}
                />
                <ElectionDayNotice isElectionDay={isElectionDay} />
              </div>
            </div>
            <div className="mt3 dn db-ns">
              <div className="directions-label">
                Your Address&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <a
                  className="fw5 link blue underline-hover pointer"
                  onClick={onChangeAddress}
                >
                  Change
                </a>
              </div>
              <LocationAddress address={address} />
            </div>
          </div>
          <div
            onClick={onClickDirections}
            className="directions-container relative flex-auto-ns"
          >
            <DirectionsMap
              userAddr={userAddr}
              pollAddr={pollAddr}
              directionsHref={directionsHref}
            />
          </div>
          <div className="directions-info dn-ns">
            <div className="mt3-ns">
              <div className="directions-label">
                Your Address&nbsp;&nbsp;&middot;&nbsp;
                <a
                  className="fw5 link blue underline-hover pointer"
                  onClick={onChangeAddress}
                >
                  Change
                </a>
              </div>
              <LocationAddress address={address} />
            </div>
          </div>
        </div>
        <div className="cf mb2" style={{ fontSize: 12 }}>
          <div className="fr">
            <GoogleReportForm address={address} />
          </div>
        </div>
      </div>
      <PlanMaker location={location} directionsHref={directionsHref} />
      {children}
    </div>
  )
}

export default PollingPlaceDirections
