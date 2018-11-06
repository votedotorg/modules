import React from 'react'
import cx from 'classnames'
import { getState } from '@helpusersvote/logic'
import { getMoreInfoLink } from '../utils'

const leoSiteHref = 'https://www.usvotefoundation.org/vote/eoddomestic.htm'

export function ElectionReferendums({
  info,
  ballot,
  address,
  moreInfoHref,
  onSelectChoice
}) {
  const { referendums = [] } = info
  const stateBallotInfo = {}
  const state = getState(address.state)

  if (!referendums || referendums.length === 0) {
    return null
  }

  return (
    <div className="ballot-content">
      <h3 className="b f4" style={{ borderTop: 'none' }}>
        Referendums
      </h3>
      {referendums.map(contest => (
        <div key={contest.key} className="ballot-contest">
          <label className="ballot-contest-label mb1">
            {contest.title}
            {ballot[contest.key] && (
              <span>
                &nbsp;&middot;&nbsp;&nbsp;
                <a
                  className="fw5 link blue underline-hover pointer"
                  onClick={() => onSelectChoice(contest.key, null)}
                >
                  Change
                </a>
              </span>
            )}
          </label>

          <a
            className="huv-button fw5 fr relative"
            style={{ top: '.4em' }}
            href={getMoreInfoLink({
              href: moreInfoHref,
              term: state.name + ' November 2018 ' + contest.title
            })}
            target="_blank"
            rel="noopener"
          >
            <span className="dn di-ns">More Info</span> &rarr;
          </a>

          {/* ballot[contest.key] && (
            <input
              className="read-more-checkbox"
              id={`checkbox.${contest.title}.readmore`}
              type="checkbox"
            />
          ) */}

          <div className="read-more-wrap">
            {contest.subtitle &&
              !stateBallotInfo.omit_subtitle && (
                <div className="ballot-contest-subtitle mt3">
                  {contest.subtitle}
                </div>
              )}
            {/* !ballot[contest.key] && (
              <Fragment>
                <div className="read-more-hide f6 f5-ns i fw5">
                  <span className="dn di-ns">{contest.longExcerpt}</span>
                  <span className="dn-ns">{contest.shortExcerpt}</span>
                </div>
                <div className="read-more-show f6 f5-ns i fw5">
                  {contest.text}
                </div>
              </Fragment>
            ) */}
            {contest.fiscalImpact && (
              <div className="read-more-show mv3 f6 f5-ns i fw5">
                <em>Fiscal Impact:</em> {contest.fiscalImpact}
              </div>
            )}
          </div>

          {/* ballot[contest.key] && (
            <label
              className="read-more-trigger fw5 fr ballot-link relative"
              style={{ top: '.4em' }}
              htmlFor={`checkbox.${contest.title}.readmore`}
            />
          ) */}

          <div className="list pl0 mt2">
            {contest.referendumBallotResponses &&
              contest.referendumBallotResponses.map((response, index) => {
                const isOtherChecked =
                  ballot[contest.key] && ballot[contest.key] !== response

                return (
                  <div
                    className={cx('lh-copy mr3 mb2', isOtherChecked && 'o-60')}
                    key={index}
                  >
                    <input
                      id={`checkbox.${contest.title}.${response}`}
                      type="checkbox"
                      style={{ width: 24, height: 24 }}
                      checked={ballot[contest.key] === response}
                      onChange={() =>
                        onSelectChoice(
                          contest.key,
                          ballot[contest.key] === response ? null : response
                        )
                      }
                    />
                    <label
                      className="pl1"
                      htmlFor={`checkbox.${contest.title}.${response}`}
                    >
                      <span className="fw5 f6 pointer">{response}</span>
                    </label>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
      <div className="f6 gray mt4">
        This guide may not be a complete list of referendums on your ballot. For
        an official list of what will be on your ballot, please{' '}
        <a
          className="dib link blue underline-hover pointer"
          href={leoSiteHref}
          target="_blank"
        >
          contact your local elections office
        </a>
        .
      </div>
    </div>
  )
}
export default ElectionReferendums
