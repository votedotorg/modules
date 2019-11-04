import React from 'react'
import cx from 'classnames'

export function BallotHeader({
  address,
  progress,
  ballot,
  onOpenModal,
  onSelectChoice,
  onChangeAddress,
  newChoiceCount
}) {
  const progressWidth = `${progress}%`

  return (
    <div>
      <div className="flex-ns flex-row-ns ballot-header ballot-header--floating">
        <div className="flex-auto-ns">
          <div className="directions-label">
            Your Progress
            {Object.keys(ballot).length > 0 && (
              <span>
                &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <a
                  className="fw5 link blue underline-hover pointer"
                  onClick={() => onSelectChoice('*', null)}
                >
                  Reset
                </a>
              </span>
            )}
          </div>
          <div className="relative">
            <div className="progress mt1">
              <div
                style={{ width: progressWidth }}
                className="progress-inner huv-button--blue"
              />
              <div className={`progress-text ${progress >= 54 ? 'major' : ''}`}>
                {progressWidth}
              </div>
            </div>
          </div>
        </div>
        <div className="mt3 mt0-ns pl3-ns">
          <div className="directions-label">
            Your Address&nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <a
              className="fw5 link blue underline-hover pointer"
              onClick={onChangeAddress}
            >
              Change
            </a>
          </div>
          <div>
            {address.line1}
            <br />
            {address.city}, {address.state} {address.zip}
          </div>
        </div>
        <div className="mt3 mt0-ns pl3-ns dn dn-m db-ns">
          <div className="directions-label flex justify-between">
            <div>On the go?</div>
            {newChoiceCount > 0 && (
              <small className="db red ttu">
                {newChoiceCount} edit
                {newChoiceCount > 1 ? 's' : ''}
              </small>
            )}
          </div>
          <div>
            <button
              className={cx(
                'huv-button',
                newChoiceCount > 0 && 'huv-button--blue'
              )}
              onClick={onOpenModal}
              style={{ height: 36 }}
            >
              Open on your phone
            </button>
          </div>
        </div>
      </div>
      <div className="ballot-header-fill" />
    </div>
  )
}

export default BallotHeader
