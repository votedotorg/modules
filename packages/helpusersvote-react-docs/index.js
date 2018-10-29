import React from 'react'
import { storiesOf } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import { withOptions } from '@storybook/addon-options'
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'
import {
  Banner,
  Modal,
  Ballot,
  PlanMaker,
  Countdown,
  ShouldShowCTA,
  PollingPlaceFinder
} from '@helpusersvote/react'

const knobForType = prop => {
  switch (typeof prop) {
    case 'number':
      return number
    case 'boolean':
      return boolean
    case 'string':
    default:
      return text
  }
}
const toValue = val => (typeof val === 'string' ? `"${val}"` : `{${val}}`)
const propsToKnobs = props =>
  Object.keys(props)
    .map(prop => ({
      prop,
      knob: knobForType(props[prop])(prop, props[prop])
    }))
    .reduce((newProps, { prop, knob }) => {
      newProps[prop] = knob
      return newProps
    })
const renderDefaultProps = props =>
  Object.keys(props)
    .map(key => {
      return `  ${key}=${toValue(props[key])}`
    })
    .join('\n')

const MdCode = children => '```' + children + '```'
const renderNotes = ({ name, defaultProps }) => `
# Installation

You can easily install this module with npm:

${MdCode(`$ npm install --save @helpusersvote/react`)}

If you just want this component, you can import it with:

${MdCode(`import { ${name} } from '@helpusersvote/react`)}

# Example

${MdCode(`
<${name}
${renderDefaultProps(defaultProps)}
/>`)}
`

const bannerOptions = {
  notes: {
    markdown: renderNotes({
      defaultProps: Banner.defaultProps,
      name: 'Banner',
      pkg: 'banner'
    })
  }
}

storiesOf('Banner', module)
  .addDecorator(
    withOptions({
      showAddonPanel: true
    })
  )
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withNotes)
  .add(
    'Default Banner',
    () => {
      const props = propsToKnobs(Banner.defaultProps)

      return <Banner {...props} />
    },
    bannerOptions
  )
  .add(
    'Custom Call-to-Action',
    () => {
      const props = propsToKnobs({
        ...Banner.defaultProps,
        ctaText: 'Register in 2 minutes'
      })

      return <Banner {...props} />
    },
    bannerOptions
  )

storiesOf('Modal', module)
  .addDecorator(
    withOptions({
      showAddonPanel: true
    })
  )
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .add('Default Modal', () => <Modal />)
  .add('Company Logo', () => {
    const domain = text('Company Domain', 'segment.com')

    return (
      <Modal
        logoProps={{
          logoUrl: `https://logo.clearbit.com/${domain}`
        }}
      />
    )
  })

storiesOf('Countdown', module)
  .addDecorator(
    withOptions({
      showAddonPanel: true
    })
  )
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .add('Default Countdown', () => (
    <div style={{ padding: 16 }}>
      There are <Countdown /> left to election day!
    </div>
  ))
  .add('Running Countdown', () => (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0 }}>
        <Countdown format="running" />
      </h2>{' '}
      <h4 style={{ margin: 0, color: 'gray' }}>days left</h4>
    </div>
  ))

storiesOf('Should Show CTA', module)
  .addDecorator(
    withOptions({
      showAddonPanel: true
    })
  )
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .add('Simple', () => {
    const visible = boolean('Always show banner?')

    return (
      <div style={{ padding: 16 }}>
        <ShouldShowCTA visible={visible}>
          <Banner />
        </ShouldShowCTA>
        <ShouldShowCTA visible={visible} opposite>
          <code>
            Note: Today is not Election Day or National Voter Registration Day.
            This won't show up in production.
          </code>
        </ShouldShowCTA>
      </div>
    )
  })
  .add('Based on state', () => {
    const state = text('State', 'California')

    return (
      <div style={{ padding: 16 }}>
        <ShouldShowCTA state={state}>
          <Banner />
        </ShouldShowCTA>
        <ShouldShowCTA state={state} opposite>
          <code>
            Note: Today is not Election Day, National Voter Registration Day or{' '}
            {state} voter registration deadline. This won't show up in
            production.
          </code>
        </ShouldShowCTA>
      </div>
    )
  })

const POLLING_PLACE_FINDER_CLASSES = 'ph5-ns ph2 pb4 center'

storiesOf('Polling Place Finder', module)
  .addDecorator(
    withOptions({
      showAddonPanel: false
    })
  )
  .add('Default', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <PollingPlaceFinder />
    </div>
  ))
  .add('Early Voting', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <PollingPlaceFinder type="early" />
    </div>
  ))
  .add('Make a Plan', () => {
    const children = (
      <div className="mb4">
        <PlanMaker.Styles />
        <PlanMaker />
      </div>
    )

    return (
      <div className={POLLING_PLACE_FINDER_CLASSES}>
        <PollingPlaceFinder.Styles />
        <PollingPlaceFinder directionsChildren={children} />
      </div>
    )
  })
  .add('Election Day', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <PollingPlaceFinder electionDay />
    </div>
  ))
  .add('Not Found', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <PollingPlaceFinder
        notFound
        address={{ line1: '123 Main St', city: 'Farmsville', state: 'VA' }}
      />
    </div>
  ))
  .add('Not Found · Early', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <PollingPlaceFinder
        notFound
        type="early"
        address={{ line1: '123 Main St', city: 'Farmsville', state: 'VA' }}
      />
    </div>
  ))
  .add('Error Preview', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <PollingPlaceFinder>
        <FakeError />
      </PollingPlaceFinder>
    </div>
  ))

function FakeError() {
  throw new Error('simulated fake error for Storybook')
}

storiesOf('Ballot', module)
  .addDecorator(
    withOptions({
      showAddonPanel: false
    })
  )
  .add('Default', () => (
    <div className={POLLING_PLACE_FINDER_CLASSES}>
      <PollingPlaceFinder.Styles />
      <Ballot.Styles />
      <Ballot />
    </div>
  ))
