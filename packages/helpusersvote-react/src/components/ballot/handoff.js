import copyToClipboard from 'clipboard-copy'
import React, { Component, Fragment } from 'react'
import { generateQR, getKeyFragment } from './utils'
import HandoffModal from './stateless/handoff-modal'

const QR = ({ width = 60, height = 60, href, src }) =>
  href ? (
    <a href={href} target="_blank">
      <img width={width} height={height} src={src} />
    </a>
  ) : (
    <img width={width} height={height} src={src} />
  )

export class BallotHandoff extends Component {
  render() {
    const { isModalOpen, onOpenModal, onCloseModal } = this.props
    const { ballotHref, imgSrc, copied } = this.state

    if (!imgSrc) {
      return null
    }

    return (
      <Fragment>
        <div className="ballot-handoff-callout pointer" onClick={onOpenModal}>
          <div className="pr2" style={{ flex: 1 }}>
            <h4 className="ma0 f6 f5-ns lh-copy">
              Want to take this with you to the polls?
            </h4>
            <div className="lh-copy f6 f5-ns">
              In most states you can bring your phone with you into the polling
              booth to help you make your choices.{' '}
              <span className="blue">
                Click here for instructions on continuing your ballot on your
                phone.
              </span>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <HandoffModal onCloseModal={onCloseModal}>
            <div className="flex flex-wrap">
              <div className="w-75 w-50-ns pr4-ns">
                <h2 className="f4 mt0">Opening on your phone...</h2>
                <p className="lh-title">
                  On the right is an image that you can scan on your phone to
                  open your ballot. To do this:
                </p>
                <ol className="pl3">
                  <li>Open your phone camera</li>
                  <li className="mt2">Point at this screen</li>
                  <li className="mt2">Click link at the top</li>
                </ol>
                <p className="lh-title">
                  Or, send this link to yourself over email or text:
                  {copied && (
                    <small className="blue">&nbsp;(copied to clipboard!)</small>
                  )}
                </p>
                <input
                  readOnly
                  type="text"
                  value={ballotHref}
                  onClick={this.onInputClick}
                  className="mw-100 w-100 f6-ns f7 input-reset ba b--black-20 pa2 border-box br1"
                />
              </div>
              <div className="w-25 w-50-ns justify-center flex flex-column">
                <QR width="100%" height="100%" href={ballotHref} src={imgSrc} />
              </div>
            </div>
          </HandoffModal>
        )}
      </Fragment>
    )
  }

  state = {}

  async componentDidMount() {
    await this.deriveQR()
  }

  componentWillUnmount() {
    if (this._inputClickTimeout) clearTimeout(this._inputClickTimeout)
  }

  async componentWillReceiveProps(props) {
    if (props.ready && !this.props.ready) {
      await this.deriveQR()
    }
  }

  onInputClick = evt => {
    if (this._inputClickTimeout) {
      clearTimeout(this._inputClickTimeout)
    }

    if (evt && evt.target) {
      const node = evt.target

      setTimeout(() => {
        const { value = '' } = node

        node.setSelectionRange(0, value.length)
        copyToClipboard(value)
      }, 0)
      this.setState({ copied: true })

      this._inputClickTimeout = setTimeout(() => {
        this.setState({ copied: false })
      }, 1500)
    }
  }

  deriveQR = async () => {
    const { protocol, host, pathname } = window.location
    const { baseHref = `${protocol}//${host}${pathname}` } = this.props
    const keyFragment = await getKeyFragment()
    const ballotHref = baseHref + keyFragment
    const imgBuffer = await generateQR({
      text: ballotHref,
      path: 'https://helpusersvote.com/static/favicon.png',
      opt: {
        margin: 0,
        color: {
          dark: '#303E50'
        },
        errorCorrectionLevel: 'M'
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
