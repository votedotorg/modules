import React, { Component } from 'react'
import { generateQR, getKeyFragment } from './utils'

export class BallotHandoff extends Component {
  render() {
    const { ballotHref, imgSrc } = this.state

    return imgSrc ? (
      <div className="ballot-handoff-container">
        <div className="pr2" style={{ flex: 1 }}>
          <h4 className="ma0 f6 f5-ns">
            Want to take this with you to the polls?
          </h4>
          <div className="lh-title f6 f5-ns">
            In most states you can bring your phone with you into the polling
            booth to help you make your choices. Use the QR code on the right to
            pick up where you left off!
          </div>
        </div>
        <a href={ballotHref}>
          <img width={60} height={60} src={imgSrc} />
        </a>
      </div>
    ) : null
  }

  state = {}

  async componentDidMount() {
    const {
      baseHref = 'https://www.vote.org/ballot-information/' // 'https://helpusersvote.com/apps/ballot'
    } = this.props
    const keyFragment = '' // await getKeyFragment()
    const ballotHref = baseHref + keyFragment
    const imgBuffer = await generateQR({
      text: ballotHref,
      path: 'https://helpusersvote.com/static/favicon.png',
      opt: {
        margin: 0,
        errorCorrectionLevel: 'H'
      }
    })
    const imgSrc =
      'data:image/png;base64,' +
      window.btoa(String.fromCharCode.apply(null, imgBuffer))

    this.setState({
      ballotHref,
      imgSrc
    })
  }
}

export default BallotHandoff
