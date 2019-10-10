import React from 'react'
import { trackEvent } from '../utils'

function GoogleReportForm({ address = {} }) {
  return (
    <form
      onSubmit={() =>
        trackEvent({
          name: 'Google Error Reported',
          properties: {
            state: address.state,
            zip: address.zip
          }
        })
      }
      id="feedback-submit"
      action="https://voter-info-tool.appspot.com/feedback"
      target="_blank"
      method="post"
    >
      <input type="hidden" name="electionId" value="0" />
      <input
        type="hidden"
        name="address"
        value={`${address.line1}, ${address.city}, ${address.state} ${
          address.zip
        }`}
      />
      <input type="submit" value="Report an error" className="report-error" />
    </form>
  )
}

export default GoogleReportForm
