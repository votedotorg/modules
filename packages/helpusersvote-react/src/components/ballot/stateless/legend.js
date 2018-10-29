import React from 'react'
import _ from 'lodash'
import { getPartyColor } from '../utils'

function MoreInfoSelect({ onSelect }) {
  return (
    <select
      className="huv-button"
      onChange={e => onSelect(e.target.value)}
      style={{
        minWidth: 140,
        appearance: 'menulist-button',
        WebkitAppearance: 'menulist-button'
      }}
    >
      <option value="ballotready.org">ballotready.org</option>
      <option value="ballotpedia.org">ballotpedia.org</option>
    </select>
  )
}

export function Legend({ info, onMoreInfoHrefSelect }) {
  const { generals = [] } = info

  let content = null

  if (generals && generals.length > 0) {
    const parties = _.uniq(
      _.flattenDeep(
        generals.map(g => {
          return g.candidates ? g.candidates.map(c => c.parties) : []
        })
      )
    )

    content = (
      <div className="flex justify-between flex-wrap">
        {parties.map((party, index) => (
          <div className="w-100 w-50-ns pb2">
            <span
              key={index}
              title={party}
              className={`party-icon ${getPartyColor(party)}`}
            >
              {party[0]}
            </span>
            <span className="ml2">{party}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="ballot-content" style={{ paddingBottom: 0 }}>
      <h3 className="b f4" style={{ borderTop: 'none' }}>
        Legend
      </h3>
      {content}
      <div className="directions-label mt2">More info will open on</div>
      <MoreInfoSelect onSelect={onMoreInfoHrefSelect} />
    </div>
  )
}
export default Legend
