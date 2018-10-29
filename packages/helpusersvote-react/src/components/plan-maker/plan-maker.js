import React, { Component } from 'react'
import Button from '../polling-place-finder/stateless/button'

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

export class PlanMaker extends Component {
  render() {
    const {
      email,
      emailSubmitted,
      phone,
      phoneSubmitted,
      stepIndex,
      stepValues
    } = this.state
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
            onSelect={this.onStepSelect(stepIndex)}
          />
        </div>
        <div className="footer-container">
          <div className="directions-label">Want a reminder in your email?</div>
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
              <Button classes="ml2" style={{ height: 36 }}>
                Remind
              </Button>
            </form>
          )}
          <div className="directions-label mt3">Or on your phone?</div>
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
              <Button classes="ml2" style={{ height: 36 }}>
                Remind
              </Button>
            </form>
          )}
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

    const { [key]: value } = this.state

    // TODO: submit email/phone to VDO Reminders API
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

export default PlanMaker
