import React, { Fragment } from 'react'
import { getMoreCandidateInfoLink, getPartyColor } from '../utils'

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

export function ElectionCandidates({
  state,
  info = {},
  ballot = {},
  moreInfoHref,
  onSelectChoice
}) {
  const { generals = defaultGeneralElections } = info

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
                  className="fw5 link blue underline-hover"
                  onClick={() => onSelectChoice(contest.office, null)}
                >
                  Change
                </a>
              </span>
            )}
          </label>
          {contest.candidates.map(candidate => (
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

  if (ballot[contest.office] && !isChecked) {
    return null
  }

  return (
    <div className="ballot-candidate mt1" style={{ padding: '2px 0' }}>
      <div className="dib" style={{ width: 20 }}>
        <input
          type="checkbox"
          id={`checkbox.${contest.office}.${candidate.name}`}
          checked={isChecked}
          style={{ width: 20, height: 20 }}
          onChange={() =>
            onSelectChoice(contest.office, isChecked ? null : candidate.key)
          }
        />
      </div>
      <label
        className="f6 pl1 pointer dib v-top"
        style={{ width: 'calc(100% - 20px)', height: 20 }}
        htmlFor={`checkbox.${contest.office}.${candidate.name}`}
      >
        <span className="fw5 dib v-mid mr1">
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
        {!ballot[contest.office] && (
          <a
            className="ballot-link fw5 fr relative"
            style={{ top: '.4em' }}
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
        )}
      </label>
    </div>
  )
}

export default ElectionCandidates
