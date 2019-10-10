import React, { Component } from 'react'
import PollingPlaceFinderError from './stateless/polling-place-finder-error'
import PollingPlaceDirections from './polling-place-directions'
import EarlyVotingDirections from './early-voting-directions'
import AddressForm from './stateless/address-form'
import { setEncryptedBallot } from '../ballot/utils'
import {
  loadGmaps,
  trackEvent,
  reportError,
  trackPageview,
  fetchVoterInfo,
  getQueryAddress,
  listenForEvents,
  normalizeVoterInfo,
  getEncryptedAddress,
  setEncryptedAddress,
  getEncryptedVoterInfo,
  setEncryptedVoterInfo,
  getQueryParam
} from './utils'

class PollingPlaceFinder extends Component {
  render() {
    const {
      onSelectAddress,
      onChangeAddress,
      onClickDirections,
      onLocationSelectIndex,
      onSwitchToEarlyVoting,
      onSwitchToPollingPlace
    } = this
    const { notFound, children, directionsChildren } = this.props
    const {
      ready,
      address,
      didError,
      voterInfo,
      queryParams,
      locationSelectIndex,
      shouldUseAutocomplete
    } = this.state

    const type = this.state.overrideType || this.props.type

    if (!ready) {
      return <div className="huv-container" />
    }

    if (didError) {
      return (
        <div className="huv-container">
          <PollingPlaceFinderError />
        </div>
      )
    }

    if (notFound && address) {
      const directionsProps = {
        address,
        notFound,
        voterInfo,
        queryParams,
        onChangeAddress,
        onClickDirections,
        onSwitchToEarlyVoting,
        onSwitchToPollingPlace
      }

      return type ? (
        <div className="huv-container">
          <EarlyVotingDirections {...directionsProps} />
        </div>
      ) : (
        <div className="huv-container">
          <PollingPlaceDirections {...directionsProps} />
        </div>
      )
    }

    let content

    if (!(address && address.line1 && voterInfo && voterInfo.locations)) {
      content =
        type === 'early' ? (
          <AddressForm
            title="Find your early voting location"
            description="We’ll find where you can go vote early, so you can skip Election Day lines."
            useAutocomplete={shouldUseAutocomplete}
            onSelectAddress={onSelectAddress}
          />
        ) : (
          <AddressForm
            useAutocomplete={shouldUseAutocomplete}
            onSelectAddress={onSelectAddress}
          />
        )
    } else {
      if (type === 'early') {
        content = (
          <EarlyVotingDirections
            address={address}
            voterInfo={voterInfo}
            queryParams={queryParams}
            onChangeAddress={onChangeAddress}
            onClickDirections={onClickDirections}
            locationSelectIndex={locationSelectIndex}
            onLocationSelectIndex={onLocationSelectIndex}
            onSwitchToPollingPlace={onSwitchToPollingPlace}
            children={directionsChildren}
          />
        )
      } else {
        content = (
          <PollingPlaceDirections
            address={address}
            voterInfo={voterInfo}
            queryParams={queryParams}
            onChangeAddress={onChangeAddress}
            onClickDirections={onClickDirections}
            onSwitchToEarlyVoting={onSwitchToEarlyVoting}
            children={directionsChildren}
          />
        )
      }
    }

    return (
      <div className="huv-container">
        {content}
        {children}
      </div>
    )
  }

  state = {
    queryParams: {},
    ready: false,
    address: {}
  }

  componentDidCatch(error, info) {
    this.setState({ didError: true })

    // Report to sentry
    reportError(error, info)
  }

  async componentDidMount() {
    try {
      await this.prepareState()

      // defer analytics to next cycle
      setTimeout(() => this.startAnalytics(), 0)
    } catch (err) {
      console.error(err)
      this.setState({ didError: true })
      reportError(err)
    }
  }

  startAnalytics = () => {
    const { address } = this.state
    const { type } = this.props
    const name =
      type === 'early' ? 'Early Voting Finder' : 'Polling Place Finder'
    const pageview = { name }

    if (address && address.state) {
      pageview.properties = {
        state: address.state
      }
    }

    trackPageview(pageview)
    listenForEvents()
  }

  onClickDirections = () => {
    const { address } = this.state
    const { state } = address

    trackEvent({
      name: 'Directions Clicked',
      properties: {
        state
      }
    })
  }

  prepareState = async () => {
    const address =
      this.props.address || getQueryAddress() || (await getEncryptedAddress())
    const voterInfo = await this.getVoterInfo({ address })

    // If we're getting linked here, set the address
    if (address && address._fromQuery) {
      // TODO: check if that's expected UX
    }

    if (address && !(voterInfo && voterInfo.address)) {
      console.log('polls.componentDidMount: found address but no voter info')
      this.setState({ address, ready: true })
    }

    if (window.localStorage.debug) {
      console.log('foundVoterInfo', voterInfo)
    }

    let shouldUseAutocomplete = true

    try {
      await loadGmaps()
    } catch (err) {
      shouldUseAutocomplete = false
      reportError(err)
    }

    try {
      const queryParams = this.props.queryParams || {
        election: this.props.electionDay || Boolean(getQueryParam('election'))
      }

      this.setState({
        address,
        voterInfo,
        queryParams,
        shouldUseAutocomplete,
        ready: true
      })
    } catch (err) {
      this.setState({ address, voterInfo, shouldUseAutocomplete, ready: true })
      reportError(err)
    }

    return
  }

  async getVoterInfo({ address }) {
    if (!address || !address.line1) {
      return null
    }

    const { alwaysUseNetwork } = this.props

    if (alwaysUseNetwork) {
      return await this.loadVoterInfo(address)
    }

    return await getEncryptedVoterInfo()
  }

  loadVoterInfo = async address => {
    const voterInfoData = await fetchVoterInfo({ address })
    const voterInfo = normalizeVoterInfo(voterInfoData)

    if (window.localStorage.debug) {
      console.log('loadedVoterInfo', voterInfo)
    }

    return voterInfo
  }

  onSelectAddress = async address => {
    setEncryptedAddress(address)

    const voterInfo = await this.loadVoterInfo(address)
    const { type } = this.props

    this.setState({ address, voterInfo })

    const properties = {
      type,
      state: address.state
    }

    trackEvent({ name: 'Address Selected', properties })
  }

  onChangeAddress = () => {
    const ballot = null
    const address = null
    const voterInfo = null

    this.setState({ address, voterInfo })

    setEncryptedAddress(address)
    setEncryptedVoterInfo(voterInfo)
    setEncryptedBallot(ballot)

    const { type } = this.props

    trackEvent({ name: 'Address Changed', properties: { type } })
  }

  onSwitchToEarlyVoting = () => {
    this.setState({
      overrideType: 'early'
    })

    const { type } = this.props
    const { address } = this.state

    const path = getPagePath({ type, to: 'early' })
    const pageview = {
      name: 'Early Voting Finder',
      properties: { path, from: 'polls' }
    }

    if (address && address.state) {
      pageview.properties.state = address.state
    }

    trackPageview(pageview)
  }

  onSwitchToPollingPlace = () => {
    this.setState({
      overrideType: 'polls'
    })

    const { type } = this.props
    const { address } = this.state

    const path = getPagePath({ type, to: 'polls' })
    const pageview = {
      name: 'Polling Place Finder',
      properties: { path, from: 'early' }
    }

    if (address && address.state) {
      pageview.properties.state = address.state
    }

    trackPageview(pageview)
  }

  onLocationSelectIndex = locationSelectIndex =>
    this.setState({ locationSelectIndex })
}

function getPagePath({ type, to }) {
  if (type === 'early') {
    if (to === 'polls') {
      return '/polls'
    }
  } else {
    if (to === 'early') {
      return '/early'
    }
  }

  return '/'
}

PollingPlaceFinder.defaultProps = {
  alwaysUseNetwork: true
}

export default PollingPlaceFinder