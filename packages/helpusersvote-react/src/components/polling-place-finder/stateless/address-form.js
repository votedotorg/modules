import React, { Component } from 'react'
import AddressAutocomplete from './address-auto-complete'
import Button from './button'

const addressFields = ['line1', 'city', 'state', 'zip']
const FIELD_PLACEHOLDERS = {
  line1: 'Street Address',
  city: 'City',
  state: 'State',
  zip: 'Zip Code'
}

class AddressForm extends Component {
  render() {
    const { state, props } = this
    const { title } = props
    const { useAutocomplete, autocompleteActive } = state
    const content = useAutocomplete ? (
      <AddressAutocomplete
        onToggleAutocomplete={this.onToggleAutocomplete}
        onAutocompleteValueChange={this.onAutocompleteValueChange}
        onAutocompleteSelectAddress={this.onAutocompleteSelectAddress}
      />
    ) : (
      addressFields.map((field, index) => (
        <div
          key={field}
          className={`w-100 w-50-ns ${
            index % 2 === 0 ? 'pr3-ns' : ''
          } pb3 border-box`}
        >
          <input
            required
            type="text"
            name={field}
            value={state[field]}
            onChange={this.onInputChange(field)}
            className="mw-100 w-100 f4-ns f5 input-reset ba b--black-20 pa2 border-box br1"
            placeholder={FIELD_PLACEHOLDERS[field]}
          />
        </div>
      ))
    )

    return (
      <form
        onSubmit={this.onSubmit}
        className="huv-address-form w-100 mt3 mt4-ns"
      >
        <div className="heading-container">
          <h1 className="heading">{title}</h1>
        </div>
        <div className="huv-address-form-content">
          <div className="mt1 mb3 f5 f4-ns">Enter your address:</div>
          <div className="flex flex-wrap">{content}</div>
          {autocompleteActive ? null : (
            <div className="mt3 flex justify-center">
              <Button width={100} blue onClick={this.onSubmit}>
                Go!
              </Button>
            </div>
          )}
        </div>
      </form>
    )
  }

  state = {
    line1: '',
    city: '',
    state: '',
    zip: ''
  }

  constructor(props) {
    super(props)

    if (props.useAutocomplete) {
      this.state.useAutocomplete = true
    }
  }

  onToggleAutocomplete = () => {
    this.setState({
      useAutocomplete: !this.state.useAutocomplete
    })
  }

  onAutocompleteValueChange = value => {
    const autocompleteActive = Boolean(value && value.length >= 3)

    this.setState({ autocompleteActive })
  }

  onAutocompleteSelectAddress = address => {
    this.setState({
      ...address
    })

    this.props.onSelectAddress(address)
  }

  onInputChange = key => e => this.setState({ [key]: e.target.value })

  onSubmit = e => {
    if (e.preventDefault) e.preventDefault()

    const address = addressFields.reduce((acc, field) => {
      acc[field] = this.state[field]
      return acc
    }, {})
    const invalid =
      Object.values(address).filter(
        // Confirm each state of the relevant values is a string
        s => typeof s === 'string' && (!s || s.length < 2)
      ).length > 0

    if (invalid) {
      return
    }

    this.props.onSelectAddress(address)
  }
}

AddressForm.defaultProps = {
  title: 'Find out where to vote',
  onSelectAddress: () =>
    console.warn('Missing `onSubmit` for `<AddressForm />`')
}

export default AddressForm
