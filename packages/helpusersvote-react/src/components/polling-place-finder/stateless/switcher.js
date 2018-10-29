import React from 'react'
import cx from 'classnames'

export function Switcher({
  active,
  earlyVotingTimeLeft,
  onSwitchToEarlyVoting,
  onSwitchToPollingPlace
}) {
  return (
    <div className="huv-switcher">
      <div
        className={cx(
          'huv-switcher-item',
          active === 'polls' && 'huv-switcher-item--active'
        )}
        onClick={onSwitchToPollingPlace}
      >
        Vote on Election Day
      </div>
      <div
        className={cx(
          'huv-switcher-item',
          active === 'early' && 'huv-switcher-item--active'
        )}
        onClick={onSwitchToEarlyVoting}
      >
        Vote Early {earlyVotingTimeLeft ? `(${earlyVotingTimeLeft} left)` : ''}
      </div>
    </div>
  )
}

Switcher.defaultProps = {
  active: 'polls',
  onSwitchToEarlyVoting: () => {},
  onSwitchToPollingPlace: () => {}
}

export default Switcher
