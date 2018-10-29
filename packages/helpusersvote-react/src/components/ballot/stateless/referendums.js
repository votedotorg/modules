import React from 'react'
import { getState } from '@helpusersvote/logic'
import { getMoreInfoLink } from '../utils'

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
                &nbsp;&middot;&nbsp;
                <a
                  className="fw5 link blue underline-hover"
                  onClick={() => onSelectChoice(contest.key, null)}
                >
                  Change
                </a>
              </span>
            )}
          </label>

          {!ballot[contest.key] && (
            <a
              className="ballot-link fw5 fr pl2 relative"
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
          )}

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
                <div className="ballot-contest-subtitle">
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
            {contest.fiscalImpact &&
              !ballot[contest.key] && (
                <div className="read-more-show mt2 f6 f5-ns i fw5">
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

          <div className="list pl0">
            {contest.referendumBallotResponses &&
              contest.referendumBallotResponses.map(response => (
                <div className="lh-copy mr3" key={contest.key + response}>
                  {(!ballot[contest.key] ||
                    ballot[contest.key] === response) && (
                    <div>
                      <input
                        id={`checkbox.${contest.title}.${response}`}
                        type="checkbox"
                        checked={ballot[contest.key] === response}
                        onChange={() => onSelectChoice(contest.key, response)}
                      />
                      <label
                        className="pl1"
                        htmlFor={`checkbox.${contest.title}.${response}`}
                      >
                        <span className="fw5 f6">{response}</span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export default ElectionReferendums
