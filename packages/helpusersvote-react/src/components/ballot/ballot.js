import _ from 'lodash'
import React, { Component } from 'react'
import PollingPlaceFinderError from '../polling-place-finder/stateless/polling-place-finder-error'
import GoogleReportForm from '../polling-place-finder/stateless/google-report-form'
import AddressForm from '../polling-place-finder/stateless/address-form'
import BallotHeader from './stateless/ballot-header'
import BallotNotFound from './stateless/not-found'
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
  listenForEvents,
  normalizeVoterInfo
} from '../polling-place-finder/utils'
import {
  getEncryptedBallot,
  setEncryptedBallot,
  getEncryptedAddress,
  setEncryptedAddress,
  recoverEncryptedValues,
  persistEncryptedValues
} from './utils'

export function StatelessBallot({
  info,
  ballot,
  address = {},
  progress = 0,
  handoffReady,
  newChoiceCount,
  moreInfoHref = 'ballotpedia.org',
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onSelectChoice,
  onChangeAddress,
  onMoreInfoHrefSelect,
  ...props
}) {
  const referendumTopics = []

  return (
    <div className="center" style={{ maxWidth: 800 }} {...props}>
      <Notice referendumTopics={referendumTopics} />

      <div className="ballot mt2 mt3-ns">
        <BallotHeader
          ballot={ballot}
          address={address}
          progress={progress}
          onOpenModal={onOpenModal}
          onSelectChoice={onSelectChoice}
          onChangeAddress={onChangeAddress}
          newChoiceCount={newChoiceCount}
        />
        <Legend info={info} onMoreInfoHrefSelect={onMoreInfoHrefSelect} />
        <Contests
          info={info}
          state={address.state}
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
        <BallotHandoff
          ready={handoffReady}
          isModalOpen={isModalOpen}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
        />
      </div>

      <div className="cf mt1" style={{ fontSize: 12 }}>
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
      onCloseModal,
      onOpenModal,
      props,
      state
    } = this

    const { isHandoffModalOpen, ...otherProps } = props
    const {
      ready,
      ballot,
      address,
      voterInfo,
      isModalOpen = isHandoffModalOpen,
      moreInfoHref,
      handoffReady,
      newChoiceCount,
      shouldUseAutocomplete
    } = state

    if (!ready) {
      return null
    }

    let content

    if (!(address && address.line1)) {
      content = (
        <AddressForm
          title="What's on your ballot?"
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
      } else if (
        !(voterInfo.generals && voterInfo.generals.length) &&
        !(voterInfo.referendums && voterInfo.referendums.length)
      ) {
        content = (
          <BallotNotFound
            address={address}
            voterInfo={voterInfo}
            onChangeAddress={onChangeAddress}
          />
        )
      } else {
        const totalCount =
          voterInfo.generals.length +
          voterInfo.referendums.filter(r => r.referendumBallotResponses).length
        const progress = Math.min(
          Math.floor((Object.keys(ballot).length / totalCount) * 100),
          100
        )

        content = (
          <StatelessBallot
            ballot={ballot}
            address={address}
            info={voterInfo}
            progress={progress}
            handoffReady={handoffReady}
            moreInfoHref={moreInfoHref}
            newChoiceCount={newChoiceCount}
            isModalOpen={isModalOpen}
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
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
    let ballot, address, voterInfo, didCompleteHandoff

    const hash = _.get(window, 'location.hash') || ''

    try {
      // defer analytics to next cycle
      setTimeout(() => this.startAnalytics(), 0)
    } catch (err) {
      console.error(err)
      reportError(err)
    }

    if (hash) {
      await recoverEncryptedValues({ hash })
      didCompleteHandoff = true
    }

    try {
      ballot = await getEncryptedBallot()
      address = await getEncryptedAddress()
      voterInfo = await this.loadVoterInfo(address)
    } catch (err) {
      console.error(err)
      reportError(err)
    }

    let shouldUseAutocomplete = true

    try {
      await loadGmaps()
    } catch (err) {
      shouldUseAutocomplete = false
      reportError(err)
    }

    await this.setState({
      shouldUseAutocomplete,
      handoffReady: true,
      voterInfo,
      address,
      ballot,
      ready: true
    })

    if (didCompleteHandoff) {
      const event = { name: 'Ballot Handoff Completed' }

      if (address && address.state) {
        event.properties = {
          state: address.state
        }
      }

      trackEvent(event)
    }

    this.attachListeners()
  }

  startAnalytics = () => {
    const { address } = this.state
    const name = 'Ballot Preview'
    const pageview = { name }

    if (address && address.state) {
      pageview.properties = {
        state: address.state
      }
    }

    trackPageview(pageview)
    listenForEvents()
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

    let elTop = $ballot.offsetTop
    let ballotWidth = getNodeWidth($ballot)
    let floatingHeader = false

    this._resizeHandler = function resizeHandler() {
      ballotWidth = getNodeWidth($ballot)

      if (floatingHeader) {
        $header.style = `width: ${ballotWidth}px;`
      }
    }

    this._scrollHandler = function scrollHandler() {
      const scrollY = window.scrollY

      if (scrollY >= elTop) {
        floatingHeader = true

        if (typeof $header.style === 'string') {
          $header.style = `width: ${ballotWidth}px;`
        } else {
          $header.style.width = `${ballotWidth}px`
        }

        $header.classList.add('floating')
        $headerFill.classList.add('visible')
      } else {
        floatingHeader = false

        if (typeof $header.style === 'string') {
          $header.style = ''
        } else {
          $header.style.width = ''
        }

        $header.classList.remove('floating')
        $headerFill.classList.remove('visible')
      }
    }

    window.addEventListener('resize', this._resizeHandler)
    window.addEventListener('scroll', this._scrollHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
    window.removeEventListener('scroll', this._scrollHandler)
  }

  componentDidCatch(error, info) {
    this.setState({ didError: true })

    // Report to sentry
    reportError(error, info)
  }

  onSelectChoice = async (key, value) => {
    let {
      choiceDelta = {},
      newChoiceCount = 0,
      ballot: previousBallot
    } = this.state
    let ballot = { ...previousBallot }

    if (key === '*' && !value) {
      Object.keys(ballot).forEach(k => {
        delete ballot[k]
      })
      choiceDelta = {}
    } else if (value === null) {
      delete ballot[key]
      choiceDelta[key] = true
    } else {
      ballot[key] = value
      choiceDelta[key] = true
    }

    newChoiceCount = Object.keys(choiceDelta).length

    this.setState({ ballot, choiceDelta, newChoiceCount, handoffReady: false })

    try {
      await setEncryptedBallot(ballot)

      this.setState({ handoffReady: true })
    } catch (err) {
      reportError(err)
    }

    const { address, voterInfo } = this.state

    const totalCount =
      voterInfo.generals.length +
      voterInfo.referendums.filter(r => r.referendumBallotResponses).length
    const progress = Math.min(
      Math.floor((Object.keys(ballot).length / totalCount) * 100),
      100
    )

    // Check if progress is at least 20%
    // and within 4 pct of  25, 50, 75 or 100%
    if (progress > 20 && progress % 25 < 4) {
      const event = { name: 'Ballot Updated', properties: { progress } }

      if (address && address.state) {
        event.properties.state = address.state
      }

      trackEvent(event)
    }
  }

  onSelectAddress = async address => {
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

    try {
      await setEncryptedAddress(address)
      await setEncryptedBallot({})

      this.setState({ handoffReady: true })
    } catch (err) {
      reportError(err)
    }
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

  onOpenModal = async () => {
    await persistEncryptedValues()
    this.setState({ isModalOpen: true, choiceDelta: {}, newChoiceCount: 0 })

    const { address } = this.state
    const event = { name: 'Ballot Handoff Started' }

    if (address && address.state) {
      event.properties = {
        state: address.state
      }
    }

    trackEvent(event)
  }

  onCloseModal = () => {
    this.setState({ isModalOpen: false })
  }
}

function getNodeWidth(node) {
  if (!node) {
    return 800
  }

  if (typeof node.getBoundingClientRect === 'function') {
    return node.getBoundingClientRect().width
  } else {
    return node.offsetWidth
  }
}

export default Ballot
