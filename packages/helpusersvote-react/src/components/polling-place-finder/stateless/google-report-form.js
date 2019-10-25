import React from 'react'
import { 
  trackEvent,
  getEncryptedAddress,
  setEncryptedAddress
} from '../utils'

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
      action="https://ballotinfo.org/bip/report_issue.html"
      target="_blank"
      method="post"
    >
      <input type="hidden" name="electionId" value="0" />
      <input type="submit" value="Report an error" className="report-error" />
    </form>
  )
}

export default GoogleReportForm
