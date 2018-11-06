import cx from 'classnames'
import React, { Fragment } from 'react'
import { getMoreCandidateInfoLink, getPartyColor } from '../utils'

const leoSiteHref = 'https://www.usvotefoundation.org/vote/eoddomestic.htm'

function CandidateParties({ parties = [] }) {
  return (
    <Fragment>
      {parties.map((party, index) => (
        <span
          key={index}
          title={party}
          className={`party-icon mr2 ${getPartyColor(party)}`}
        >
          {party[0]}
        </span>
      ))}
    </Fragment>
  )
}

const defaultGeneralElections = [
  {
    office: 'U.S. Senator',
    candidates: [
      { name: 'Jane Doe', parties: ['Deer Party'] },
      { name: 'Adam Smith', parties: ['Laissez faire Party'] }
    ]
  }
]

export function Contests({
  state,
  info = {},
  ballot = {},
  moreInfoHref,
  onSelectChoice
}) {
  const { generals = defaultGeneralElections } = info

  if (!generals) {
    return null
  }

  return (
    <div className="ballot-content">
      <h3 className="b f4" style={{ borderTop: 'none' }}>
        Candidates
      </h3>
      {generals.map(contest => (
        <div key={contest.office} className="ballot-contest no-select">
          <label className="dib ballot-contest-label mb2">
            {contest.office}
            {ballot[contest.office] && (
              <span>
                &nbsp;&middot;&nbsp;
                <a
                  className="fw5 link blue underline-hover pointer"
                  onClick={() => onSelectChoice(contest.office, null)}
                >
                  Change
                </a>
              </span>
            )}
          </label>
          {contest.numberVotingFor > 1 && (
            <span className="db mb2 gray f7">
              On your ballot, you’ll be able to select up to{' '}
              {contest.numberVotingFor} candidates to vote for.{' '}
            </span>
          )}
          {contest.candidates &&
            contest.candidates.map(candidate => (
              <CandidateDetail
                key={candidate.key}
                state={state}
                ballot={ballot}
                contest={contest}
                candidate={candidate}
                moreInfoHref={moreInfoHref}
                onSelectChoice={onSelectChoice}
              />
            ))}
        </div>
      ))}
      <div className="f6 gray mt4">
        This guide may not be a complete list of candidates on your ballot. For
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

function CandidateDetail({
  state,
  ballot,
  contest,
  candidate,
  moreInfoHref,
  onSelectChoice
}) {
  const isChecked = ballot[contest.office] === candidate.key
  const isOtherChecked = ballot[contest.office] && !isChecked

  return (
    <div
      className={cx(
        'ballot-candidate flex justify-between mt1',
        isOtherChecked && 'o-40'
      )}
      style={{ padding: '2px 0' }}
    >
      <div>
        <div className="dib" style={{ width: 28 }}>
          <input
            type="checkbox"
            id={`checkbox.${contest.office}.${candidate.name}`}
            checked={isChecked}
            style={{ width: 28, height: 28 }}
            onChange={() =>
              onSelectChoice(contest.office, isChecked ? null : candidate.key)
            }
          />
        </div>
        <label
          className="f5 pl2 pointer dib v-top"
          style={{ height: 28, lineHeight: '24px' }}
          htmlFor={`checkbox.${contest.office}.${candidate.name}`}
        >
          <span className="fw5 dib v-mid mr1 ballot-candidate-name">
            {candidate.names ? (
              <Fragment>
                <b>{candidate.names[0]}</b>
                <br className="dn-ns" />& {candidate.names[1]}
              </Fragment>
            ) : (
              candidate.name
            )}
          </span>
          <CandidateParties parties={candidate.parties} />
        </label>
      </div>
      <a
        className="huv-button fw5 fr relative"
        href={getMoreCandidateInfoLink({
          href: moreInfoHref,
          contest,
          candidate,
          state
        })}
        target="_blank"
        rel="noopener"
      >
        <span className="dn di-ns">More Info</span> &rarr;
      </a>
    </div>
  )
}

export default Contests
