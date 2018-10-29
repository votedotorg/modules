import React, { Component } from 'react'
import PollingPlaceFinderError from '../polling-place-finder/stateless/polling-place-finder-error'
import GoogleReportForm from '../polling-place-finder/stateless/google-report-form'
import AddressForm from '../polling-place-finder/stateless/address-form'
import BallotHeader from './stateless/ballot-header'
import Referendums from './stateless/referendums'
import Contests from './stateless/contests'
import Legend from './stateless/legend'
import Notice from './stateless/notice'
import BallotHandoff from './handoff'
import {
  loadGmaps,
  trackEvent,
  reportError,
  trackPageview,
  fetchVoterInfo,
  normalizeVoterInfo
} from '../polling-place-finder/utils'
import {
  getEncryptedBallot,
  setEncryptedBallot,
  getEncryptedAddress,
  setEncryptedAddress
} from './utils'

export function StatelessBallot({
  info,
  ballot,
  address = {},
  progress = 0,
  moreInfoHref = 'ballotready.org',
  onSelectChoice,
  onChangeAddress,
  onMoreInfoHrefSelect,
  ...props
}) {
  const referendumTopics = []

  return (
    <div className="huv-container" {...props}>
      <Notice referendumTopics={referendumTopics} />

      <div className="ballot mt2 mt3-ns">
        <BallotHeader
          ballot={ballot}
          address={address}
          progress={progress}
          onSelectChoice={onSelectChoice}
          onChangeAddress={onChangeAddress}
        />
        <Legend info={info} onMoreInfoHrefSelect={onMoreInfoHrefSelect} />
        <Contests
          info={info}
          ballot={ballot}
          moreInfoHref={moreInfoHref}
          onSelectChoice={onSelectChoice}
        />
        <Referendums
          info={info}
          ballot={ballot}
          address={address}
          moreInfoHref={moreInfoHref}
          onSelectChoice={onSelectChoice}
        />
        <BallotHandoff />
      </div>

      <div className="cf mt1" style={{ maxWidth: 800, fontSize: 12 }}>
        <div className="fr">
          <GoogleReportForm address={address} />
        </div>
      </div>
    </div>
  )
}

export class Ballot extends Component {
  render() {
    const {
      onMoreInfoHrefSelect,
      onChangeAddress,
      onSelectAddress,
      onSelectChoice,
      props,
      state
    } = this
    const {
      ready,
      ballot,
      address,
      voterInfo,
      moreInfoHref,
      shouldUseAutocomplete
    } = state
    const { ...otherProps } = props

    if (!ready) {
      return null
    }

    let content

    if (!(address && address.line1)) {
      content = (
        <AddressForm
          title="Preview your ballot"
          onSelectAddress={onSelectAddress}
          useAutocomplete={shouldUseAutocomplete}
        />
      )
    } else {
      if (!voterInfo) {
        content = (
          <PollingPlaceFinderError
            address={address}
            onChangeAddress={onChangeAddress}
          />
        )
      } else {
        const totalCount =
          voterInfo.generals.length +
          voterInfo.referendums.filter(r => r.referendumBallotResponses).length
        const progress = Math.floor(
          (Object.keys(ballot).length / totalCount) * 100
        )

        content = (
          <StatelessBallot
            ballot={ballot}
            address={address}
            info={voterInfo}
            progress={progress}
            moreInfoHref={moreInfoHref}
            onSelectChoice={onSelectChoice}
            onChangeAddress={onChangeAddress}
            onMoreInfoHrefSelect={onMoreInfoHrefSelect}
            {...otherProps}
          />
        )
      }
    }

    return <div className="huv-container">{content}</div>
  }

  state = {
    ballot: {}
  }

  async componentDidMount() {
    const ballot = await getEncryptedBallot()
    const address = await getEncryptedAddress()
    const voterInfo = await this.loadVoterInfo(address)

    let shouldUseAutocomplete = true

    try {
      await loadGmaps()
    } catch (err) {
      shouldUseAutocomplete = false
      reportError(err)
    }

    await this.setState({
      shouldUseAutocomplete,
      voterInfo,
      address,
      ballot,
      ready: true
    })

    this.attachListeners()
  }

  loadVoterInfo = async address => {
    if (!address || !address.line1) {
      return Promise.resolve(null)
    }

    const voterInfoData = await fetchVoterInfo({ address })
    const voterInfo = normalizeVoterInfo(voterInfoData)

    if (window.localStorage.debug) {
      console.log('loadedVoterInfo', voterInfo)
    }

    return voterInfo
  }

  attachListeners = () => {
    const $ballot = document.querySelector('.ballot')
    const $header = document.querySelector('.ballot-header')
    const $headerFill = document.querySelector('.ballot-header-fill')

    if (!$ballot || !$header) {
      return
    }

    const elTop = $ballot.offsetTop

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY

      if (scrollY >= elTop) {
        $header.classList.add('floating')
        $headerFill.classList.add('visible')
      } else {
        $header.classList.remove('floating')
        $headerFill.classList.remove('visible')
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll')
  }

  onSelectChoice = (key, value) => {
    const ballot = { ...this.state.ballot }

    if (key === '*' && !value) {
      Object.keys(ballot).forEach(k => {
        delete ballot[k]
      })
    } else if (value === null) {
      delete ballot[key]
    } else {
      ballot[key] = value
    }

    setEncryptedBallot(ballot)

    this.setState({ ballot })
  }

  onSelectAddress = async address => {
    setEncryptedAddress(address)

    const voterInfo = await this.loadVoterInfo(address)
    const previouslyInvalid = !this.state.address || !this.state.address.line1

    if (previouslyInvalid && address) {
      setTimeout(() => this.attachListeners(), 0)
    }

    this.setState({
      address,
      voterInfo
    })

    trackEvent({
      name: 'Address Selected',
      properties: {
        type: 'ballot',
        state: address.state
      }
    })
  }

  onChangeAddress = () => {
    const address = null

    this.setState({ address })
    setEncryptedAddress(address)

    // Clear ballot choices
    this.onSelectChoice('*', null)
  }

  onMoreInfoHrefSelect = moreInfoHref => {
    this.setState({ moreInfoHref })
  }
}

export default Ballot
