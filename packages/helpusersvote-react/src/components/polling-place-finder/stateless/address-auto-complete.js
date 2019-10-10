import _ from 'lodash'
import cx from 'classnames'
import React, { Component } from 'react'
import {
  fetchAutocompletePlaces,
  fetchGeocoding,
  placeToAddress,
  reportError,
  fromAddr,
  toAddr
} from '../utils'

const AUTOCOMPLETE_DEBOUNCE_MS = 200

export class AddressAutoComplete extends Component {
  state = { activeIndex: -1, inputValue: '', places: [] }

  onInputChange = e => {
    const inputValue = e.target.value

    this.setState({ inputValue })

    this.onInputValueChange(inputValue)
  }

  onInputValueChange = _.debounce(inputValue => {
    if (this.props.onAutocompleteValueChange) {
      this.props.onAutocompleteValueChange(inputValue)
    }

    const notFoundState = {
      activeIndex: 0,
      places: [
        {
          onClick: this.props.onToggleAutocomplete,
          description: 'Address not found. Switch to simple address form →'
        }
      ]
    }

    if (!inputValue || inputValue.length < 3) {
      this.setState({
        activeIndex: 0,
        places: []
      })

      return inputValue
    }

    fetchAutocompletePlaces({ input: inputValue })
      .then(places => {
        if (!places || places.length === 0) {
          this.setState(notFoundState)

          return
        }

        this.setState({
          activeIndex: 0,
          places
        })
      })
      .catch(err => {
        if (err) reportError(err)

        this.setState(notFoundState)
      })

    return inputValue
  }, AUTOCOMPLETE_DEBOUNCE_MS)

  onSelect = place => {
    const inputAddress = placeToAddress(place)
    const inputValue = toAddr(inputAddress)

    this.setState({ inputValue, places: [] })

    fetchGeocoding({ address: inputValue }).then(results => {
      const result = results[0] || {}
      const address = fromAddr(result.formatted_address || '')

      if (this.props.onAutocompleteSelectAddress) {
        this.props.onAutocompleteSelectAddress(address)
      }
    })
  }

  onClear = () => this.setState({ places: [] })

  onKeyDown = e => {
    const { places, activeIndex } = this.state

    // Skip handler if there are no places available
    if (!places || !places.length) {
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        this.onClear()
        return false
      case 'Enter':
        e.preventDefault()
        if (places[activeIndex]) {
          if (places[activeIndex].onClick) {
            places[activeIndex].onClick()
          } else {
            this.onSelect(places[activeIndex])
          }
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        this.setState({ activeIndex: activeIndex - 1 || 0 })
        break
      case 'ArrowDown':
        e.preventDefault()
        this.setState({
          activeIndex: Math.min(activeIndex + 1, places.length - 1)
        })
        break
    }
  }

  render() {
    const { activeIndex, inputValue, places } = this.state

    return (
      <div className="w-100">
        <input
          required
          autoFocus
          type="text"
          name="line1"
          autoComplete="off"
          value={inputValue}
          onChange={this.onInputChange}
          onKeyDown={this.onKeyDown}
          className="mw-100 w-100 f4-ns f5 input-reset ba b--black-20 pa2 border-box br1"
        />
        <div className="address-form-auto-complete-example">
          e.g. 1600 Pennsylvania Ave NW, Washington, DC 20500
        </div>
        <Options
          list={places}
          inputValue={inputValue}
          onSelect={this.onSelect}
          activeIndex={activeIndex}
        />
      </div>
    )
  }
}

function Options({ list, onSelect, activeIndex }) {
  return (
    <div className="huv-autocomplete-options mt2 huv-shadow br2">
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => (item.onClick ? item.onClick() : onSelect(item))}
          className={cx(
            'huv-autocomplete-option pa2 f5 bb b--black-10 pointer',
            activeIndex === index && 'huv-autocomplete-option--active'
          )}
        >
          {toAutocompleteOptionLabel(item)}
        </div>
      ))}
    </div>
  )
}

function toAutocompleteOptionLabel(item) {
  const description = _.get(item, 'description') || ''

  return description.replace(', USA', '')
}

export default AddressAutoComplete
