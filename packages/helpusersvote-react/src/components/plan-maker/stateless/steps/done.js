import React from 'react'

export function Done({ values }) {
  const [transport, time] = values

  return (
    <div>
      <div>
        We can remind you to {transport} to your polling place in the {time} on
        Election Day.
        <br />
        <br />
        Just leave your email or phone number below.
      </div>
      {/*
      <h2>TODO</h2>
      <ul>
        <li>Improve sentence version of options</li>
        <li>Show add to calendar button</li>
      </ul>
      */}
    </div>
  )
}

export default Done
