import _ from 'lodash'
import * as AWS from 'aws-sdk'
import React, { Component } from 'react'
import Button from '../polling-place-finder/stateless/button'
import { reportError } from '../polling-place-finder/utils'

import Step1 from './stateless/steps/step-1'
import Step2 from './stateless/steps/step-2'
import Done from './stateless/steps/done'

const steps = [
  { title: `How're you planning to get there?`, component: Step1 },
  { title: 'What time are you planning to go?', component: Step2 }
]

const doneStep = {
  title: `You're ready to vote!`,
  component: Done
}

// Initialize Amazon Cognito
const region = 'us-east-1'
AWS.config.region = region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: region + ':349a4488-ffe3-415b-baeb-224c6f6ac3d4'
})

export class PlanMaker extends Component {
  render() {
    const { location = {}, directionsHref = '' } = this.props
    const {
      email,
      emailSubmitted,
      phone,
      phoneSubmitted,
      stepIndex,
      stepValues
    } = this.state

    const isDone = stepIndex >= steps.length
    const isEmailValid = isDone && email && email.length > 3
    const isPhoneValid = isDone && phone && phone.length > 3

    const step = steps[stepIndex] || doneStep
    const StepComponent = step.component

    return (
      <div className="outdent plan-maker mb3">
        <div className="heading-container flex justify-between">
          <h1 className="heading">{step.title}</h1>
          {stepIndex < steps.length && (
            <span className="gray f6" style={{ lineHeight: '23px' }}>
              Step {stepIndex + 1} of 2
            </span>
          )}
        </div>
        <div className="plan-maker-content">
          <StepComponent
            values={stepValues}
            location={location}
            directionsHref={directionsHref}
            onSelect={this.onStepSelect(stepIndex)}
          />
        </div>
        <div className="footer-container flex-l">
          <div className="w-50-l pr2-l">
            <div className="directions-label">
              Want a reminder in your email?
            </div>
            {emailSubmitted ? (
              <div>
                Awesome! We&rsquo;ll remind you at{' '}
                <strong>{emailSubmitted}</strong>.
              </div>
            ) : (
              <form
                onSubmit={this.onReminderSubmit('email')}
                className="flex justify-between"
              >
                <input
                  required
                  type="email"
                  value={email}
                  placeholder="Email address"
                  onChange={this.onInputChange('email')}
                  className="mw-100 w-100 f5 input-reset ba b--black-20 pa2 border-box br1"
                />
                <Button
                  disabled={!isEmailValid}
                  classes="ml2"
                  style={{ height: 36 }}
                >
                  Remind
                </Button>
              </form>
            )}
          </div>
          <div className="w-50-l pl2-l">
            <div className="directions-label mt3 mt0-l">Or on your phone?</div>
            {phoneSubmitted ? (
              <div>
                Great! You&rsquo;ll get a text at{' '}
                <strong>{phoneSubmitted}</strong>.
              </div>
            ) : (
              <form
                onSubmit={this.onReminderSubmit('phone')}
                className="flex justify-between"
              >
                <input
                  required
                  type="tel"
                  value={phone}
                  placeholder="Phone number"
                  onChange={this.onInputChange('phone')}
                  className="mw-100 w-100 f5 input-reset ba b--black-20 pa2 border-box br1"
                />
                <Button
                  disabled={!isPhoneValid}
                  classes="ml2"
                  style={{ height: 36 }}
                >
                  Remind
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  state = {
    stepIndex: 0,
    stepValues: [],
    email: '',
    phone: ''
  }

  onInputChange = key => e =>
    this.setState({ [key]: e.target ? e.target.value : e })

  onReminderSubmit = key => e => {
    // prevent form submission
    e.preventDefault()
    e.stopPropagation()

    const { location, directionsHref } = this.props

    if (location) {
      var lambdaParams = getLambdaParams({
        type: key,
        value: this.state[key],
        location,
        directionsHref
      })
      var lambda = new AWS.Lambda({ region: region, apiVersion: '2015-03-31' })

      lambda.invoke(lambdaParams, (err, data) => {
        if (err) {
          console.log(err)
          reportError(err)
        } else if (data.Payload) {
          if (data.Payload !== 'ok') {
            reportError(new Error(`vdo.remindLambda: ${data.Payload}`))
          }
        }
      })
    }

    const { [key]: value } = this.state

    this.setState({
      [key + 'Submitted']: value
    })
  }

  onStepSelect = index => value => {
    const { stepValues: oldValues } = this.state
    // create new stepValues array
    const stepValues = [...oldValues]

    stepValues[index] = value

    this.setState({ stepValues, stepIndex: index + 1 })
  }
}

/**
 * Retrieve the needed params to send to Lambda
 *
 * @param {String}
 * @return {Object}
 */
function getLambdaParams({ type, value, location, directionsHref }) {
  const payloadValue = type === 'phone' ? value.replace(/[^0-9]/gi, '') : value
  const FunctionName =
    type === 'phone' ? 'sendTextMessage' : 'sendPollingPlaceMessage'

  return {
    FunctionName,
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: JSON.stringify({
      method: type,
      value: payloadValue,
      pollLocationName: _.get(location, 'address.locationName'),
      pollAddress: _.get(location, 'address.text'),
      directions: directionsHref
    })
  }
}

export default PlanMaker
