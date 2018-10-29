import React from 'react'

export function DirectionsHours({ location, pollingPlace }) {
  return (
    <div className="directions-hours mt3">
      <div className="directions-label pb1">Hours</div>
      <div className="directions-hours fw6">
        <div className="fr">
          {location.hours && location.hours.length > 0
            ? location.hours
            : pollingPlace.hours}
        </div>
        <div className="fw6 directions-date">
          November 6<sup style={{ fontSize: 9 }}>th</sup>
        </div>
      </div>
    </div>
  )
}

export default { DirectionsDate }
