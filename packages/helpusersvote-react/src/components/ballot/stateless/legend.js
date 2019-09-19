import React from 'react'
import _ from 'lodash'
import { getPartyColor } from '../utils'

function MoreInfoSelect({ onSelect }) {
  return (
    <div className="dib huv-select-container">
      <select
        className="huv-button"
        onChange={e => onSelect(e.target.value)}
        style={{ minWidth: 140 }}
      >
        <option value="ballotpedia.org">ballotpedia.org</option>
        <option value="ballotready.org">ballotready.org</option>
      </select>
    </div>
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
      <div className="flex justify-start flex-wrap">
        {parties.map((party, index) => (
          <div key={index} className="w-100 w-50-m w-33-ns pb3">
            <span
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
    </div>
  )
}
export default Legend
