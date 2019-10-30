<h1>
  Help Users Vote Modules <a href="https://travis-ci.org/helpusersvote/modules"><img src="https://travis-ci.org/helpusersvote/modules.svg?branch=master" /></a>
</h1>

[Help Users Vote](https://helpusersvote.com) makes it easy for companies to help their users vote.

This is our monorepo of [npm](https://npmjs.com) modules to use in your application:

**Framework-specific Components**

- [@helpusersvote/react](https://github.com/helpusersvote/modules/tree/master/packages/helpusersvote-react) with [Storybook demo →](https://helpusersvote.github.io/modules)

**Native JavaScript Functions**

- [@helpusersvote/logic](https://github.com/helpusersvote/modules/tree/master/packages/helpusersvote-logic)
- [@helpusersvote/copy](https://github.com/helpusersvote/modules/tree/master/packages/helpusersvote-copy)

## Running Storybrook (and the full set of apps) locally

1. Run `npm install` in modules repo root
2. Make sure #1 executes the `npm run bootstrap` command successfully or just run `npm run bootstrap`
3. New tab, run `cd packages/helpusersvote-react`
4. In packages/helpusersvote-react, run `npm start`
5. New tab, run `cd packages/helpusersvote-react-docts`
6. In packages/helpusersvote-react-docs, run `npm start`
7. Open `http:localhost:9001` if it didn't open automatically

## Usage

If you want to add a banner to your React app, install the library:

```
npm i -S @helpusersvote/react
```

Then in your application code:

```javascript
import { Banner } from '@helpusersvote/react'
import Home from '../components/home'

const HomePage = props => (
  <Home>
    <Banner ctaColor="red">
  </Home>
)

export default HomePage
```

### Polling Place Finder in HTML

Adding the polling place finder to your website is as simple as dropping in our `<script>` tag and adding your [Google Civic Information](https://developers.google.com/civic-information/) and [Maps](https://developers.google.com/maps/documentation/) API keys:

```html
<html>
<body>
  <!-- Help Users Vote - Polling Place Finder -->
  <script>
    window.CIVIC_INFO_API_KEY = 'REPLACE_WITH_CIVIC_API_KEY'
    window.GMAPS_API_KEY = 'REPLACE_WITH_GMAPS_API_KEY'
  </script>
  <script src="https://js-cdn.helpusersvote.net/polling-place-finder.js"  defer async></script>
  <div id="huv-root" />
</body>
</html>
```

### Polling Place Finder in React

You can easily add the polling place finder into your React app by importing the component and passing in the necessary API keys:

```javascript
import { PollingPlaceFinder } from '@helpusersvote/react'
import Home from '../components/home'

const apiKeys = {
  CIVIC_INFO_API_KEY: '',
  GMAPS_API_KEY: '',
  // If you're on Google Maps Premium Plan
  GMAPS_API_SIGNATURE_SECRET: ''
}

// namespaceId = partner id for your team
// id = lookup key for call-to-action, e.g. where it's rendered
const HomePage = props => (
  <Home>
    <PollingPlaceFinder apiKeys={apiKeys}>
  </Home>
)

export default HomePage
```

We don't set any cookies on these requests — this is a configuration CDN to check if a banner versus a popup should be rendered or if the link should be purple versus pink.

## License

All modules are open-sourced under the [MIT License](https://github.com/helpusersvote/modules/blob/master/license)
