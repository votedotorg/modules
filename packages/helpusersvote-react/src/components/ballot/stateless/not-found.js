import _ from 'lodash'
import React from 'react'
import { getState } from '@helpusersvote/logic'
import POLLING_PLACE_DATA from '../../polling-place-finder/data/polls.json'
import GoogleReportForm from '../../polling-place-finder/stateless/google-report-form'

export function BallotNotFound({
  title,
  address,
  voterInfo,
  description,
  onChangeAddress
}) {
  const pollingPlace = POLLING_PLACE_DATA[address.state] || {}
  const stateSite = pollingPlace.polling_place_state_site
  const stateOfficeSite =
    _.get(
      voterInfo,
      'state.0.electionAdministrationBody.votingLocationFinderUrl'
    ) ||
    _.get(voterInfo, 'state.0.electionAdministrationBody.electionInfoUrl') ||
    'https://www.usvotefoundation.org/vote/eoddomestic.htm'

  const state = getState(
    voterInfo.address ? voterInfo.address.state : address.state
  )

  return (
    <div className="pt3 w-100">
      <div className="outdent">
        <div className="directions directions-small mt3 mb1 flex-ns flex-row-ns">
          <div className="directions-info w-40-ns flex-ns flex-column-ns justify-between-ns">
            <div className="flex-auto-ns">
              <div className="directions-label">{title}</div>
              <p className="lh-copy">
                {description || (
                  <React.Fragment>
                    We’re unable to find your ballot info. Please make sure you're entering your full address where you are registered to vote. If you're still not seeing anything, check with your{' '} 
                    <a
                      className="dib link blue underline-hover pointer"
                      href="https://www.usvotefoundation.org/vote/eoddomestic.htm"
                      target="_blank"
                    >
                      local election office 
                    </a> 
                     {' '}for full information about elections that might be occurring in your area.
                  </React.Fragment>
                )}
              </p>
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
              <div>{address.line1}</div>
              <div>
                {address.city}, {address.state} {address.zip}
              </div>
            </div>
          </div>
          <div className="directions-container relative flex-auto-ns">
            <div className="directions-map error flex items-center">
              <div className="mt1 ph2 mw6 center tc">
                We’re unable to find your ballot info.
                <br />
                <div className="mt2 f5-ns f6 center tc gray">
                  {stateSite ? (
                    <span>
                      You can try looking up your polling place on the{' '}
                      <a
                        className="link blue underline-hover pointer"
                        href={stateSite}
                        target="_blank"
                      >
                        {state.name} website
                      </a>
                      , or contact
                    </span>
                  ) : (
                    <span>Contact</span>
                  )}{' '}
                  your{' '}
                  <a
                    className="dib link blue underline-hover pointer"
                    href={stateOfficeSite}
                    target="_blank"
                  >
                    local election office
                  </a>{' '}
                  to get details.
                </div>
              </div>
            </div>
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
              <div>{address.line1}</div>
              <div>
                {address.city}, {address.state} {address.zip}
              </div>
            </div>
          </div>
        </div>
        <div className="cf" style={{ fontSize: 12 }}>
          <div className="fr">
            <GoogleReportForm address={address} />
          </div>
        </div>
      </div>
    </div>
  )
}

BallotNotFound.defaultProps = {
  title: 'No ballot info found'
}

export default BallotNotFound
