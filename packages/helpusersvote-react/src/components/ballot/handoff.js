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
