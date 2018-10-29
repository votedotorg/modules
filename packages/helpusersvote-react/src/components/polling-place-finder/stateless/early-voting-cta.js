import React from 'react'

export function EarlyVotingCTA({ isElectionDay, timeLeft, onClick }) {
  if (!timeLeft || isElectionDay) {
    return null
  }

  return (
    <div onClick={onClick}>
      <div className="mt3 fw5 f6 lh-copy ba blue br2 pa2 hover-bg-washed-blue pointer">
        Only {timeLeft} left for you to vote early find out{' '}
        <span className="dib">where now &rarr;</span>
      </div>
    </div>
  )
}

export default EarlyVotingCTA
