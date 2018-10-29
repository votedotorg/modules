import React from 'react'

export function Notice({ referendumTopics }) {
  let content = null

  if (referendumTopics && referendumTopics.length > 0) {
    content = (
      <div className="mt3">
        By voting the entire ballot, you can have a say on big issues including{' '}
        <b>
          {referendumTopics.map((topic, id) => (
            <span>
              {topic}
              {id === referendumTopics.length - 1
                ? ''
                : id === referendumTopics.length - 2
                  ? ' and '
                  : ', '}
            </span>
          ))}
        </b>
        .
      </div>
    )
  }

  return (
    <div>
      <div className="mt3 f6 gray">
        This is <span className="fw5">not an official ballot</span>, only a
        guide to help you research your decision before you vote at your polling
        place.
      </div>
      {content}
    </div>
  )
}

export default Notice
