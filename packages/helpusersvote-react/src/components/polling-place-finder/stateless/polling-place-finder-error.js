import React from 'react'

export function PollingPlaceFinderError() {
  const stateSite = false
  const stateOfficeSite =
    'https://www.usvotefoundation.org/vote/eoddomestic.htm'

  return (
    <div className="mt3 w-100">
      <div className="outdent">
        <div className="directions directions-small mt3 mb1 flex-ns flex-row-ns">
          <div className="directions-info w-40-ns flex-ns flex-column-ns justify-between-ns">
            <div className="flex-auto-ns">
              <div className="directions-label">There was an error</div>
              <p className="lh-copy">
                Our engineers are looking into why this issue occurred. You can
                contact your local election office to find your{' '}
                <span className="dib">polling place.</span>
              </p>
              <a
                className="huv-button huv-button--blue tc dib"
                href={stateOfficeSite}
              >
                Contact
              </a>
            </div>
            <div className="mt3 dn db-ns" />
          </div>
          <div className="directions-container relative flex-auto-ns">
            <div className="directions-map error flex items-center">
              <div className="mt1 ph2 mw6 center tc">
                We’re unable to find your polling place.
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
              <div className="directions-label" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollingPlaceFinderError
