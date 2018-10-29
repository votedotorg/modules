import React from 'react'

const styles = `
.huv-container {
  font-family: SF UI Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
* {
  box-sizing: border-box;
}
/**
  * Ballot.
  */
  
  .ballot {
    max-width: 800px;
    background: white;
    color: #303E50;
    overflow: hidden;
    box-shadow: rgba(67, 90, 111, 0.416) 0px 0px 1px, rgba(67, 90, 111, 0.3) 0px 2px 4px -2px;
    font-size: 16px;
    border-radius: 4px;
  }
  
  .ballot-content {
    margin: 0 16px;
    padding-bottom: 20px;
  }

  .ballot-contest {
    margin-top: 16px;
  }
  
  .ballot-contest-label {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    color: #A7B0BD;
  }
  
  .ballot-contest-subtitle {
    font-weight: 600;
    max-width: 320px;
  }
  
  .ballot-link {
    font-size: 12px;
    text-decoration: none;
    text-transform: uppercase;
    color: #2F7EE7;
    cursor: pointer;
  }
  
  .ballot-link:hover {
    text-decoration: underline;
  }

  .ballot input[type="checkbox"] {
    width: 16px;
    height: 16px;
    vertical-align: bottom;
  }

  .ballot-header {
    background: white;
    border-bottom: 1px solid #e8e8e8;
    width: 800px;
    max-width: 100%;
    padding: 16px;
    z-index: 100;
  }
  .ballot-header.floating {
    position: fixed;
    top: 0;
  }
  .ballot-header-fill {
    display: none;
    height: 172px;
  }
  .ballot-header-fill.visible {
    display: block;
  }
  @media(min-width: 528px) {
    .ballot-header-fill {
      height: 100px;
    }
    .ballot-contest-subtitle {
      max-width: 460px;
    }
  }

  .ballot-handoff-container {
    display: flex;
    padding: 16px;
    border-top: 1px solid rgba(67, 90, 111, 0.145);
    justify-content: space-between;
  }
  
  /**
  * Party icons.
  */
  
  .party-icon {
    position: relative;
    top: -1px;
    margin: 0 0 0 2px;
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    background: #A7B0BD;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    vertical-align: middle;
  }
  
  .party-icon + .party-icon {
    margin-left: 3px;
  }
  
  .party-icon.blue {
    background: #2F7EE7;
  }
  .party-icon.dark-blue {
    background: #1b3979;
  }
  .party-icon.dark-red {
    background: #c10100;
  }
  .party-icon.blue-we {
  background: #3e8bff;
}
  .party-icon.blue-wf {
    background:#004b8d;
  }
  
  .party-icon.red {
    background: #F0353E;
  }
  
  .party-icon.green {
    background: #66c700;
  }
  
  .party-icon.yellow {
    background: #fac000;
  }
  /**
 * Progress.
 */

.progress {
  position: relative;
  width: 100%;
  height: 36px;
  background-color: #eee;
  box-shadow: inset 0 0 0 1px #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.progress-inner {
  position: relative;
  height: 100%;
  transition: width 0.5s ease-in-out;
  background-color: #2F7EE7;
  overflow: hidden;
}

.progress-text {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  line-height: 36px;
  text-align: center;
  color: rgba(0,0,0,0.45);
  font-weight: bold;
  text-shadow: 0 0 4px rgba(255,255,255,.15);
}

.progress-text.major {
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,.15);
}

.report-error {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 8px 16px;
  color: #898989;
}

.report-error:hover, .report-error:focus {
  text-decoration: underline;
}

/**
 * Directions.
 */

.directions {
  position: relative;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  font-size: 16px;
  border-radius: 4px;
}

.directions-left {
  float: left;
  width: 40%;
  padding-right: 1.5rem;
}

.directions-right {
  float: right;
  width: 60%;
}

.directions-info {
  padding: 1em;
}

.directions-label {
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 19px;
  text-transform: uppercase;
  font-weight: bold;
  color: #A7B0BD;
}

.directions-summary {

}

.directions-address-line1 {
  font-weight: 600;
}

.directions-address2 {

}

.directions-toolbar {
  text-align: right;
}

.directions-toolbar > * {
  display: block;
}

.directions-toolbar > *:hover {
  text-decoration: underline;
}

.directions-change-end-button {

}

.directions-change-start-button {

}

.directions-map {
  background: #eaeaea;
  min-height: 400px;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.directions-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
}
.directions-button {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.directions-small .directions-map {
  min-height: 370px;
}


@media (max-width: 30em) {
  .directions-map {
    min-height: 180px !important;
  }
}

@media (min-width: 30em) and (max-width: 818px) {
  .directions-map {
    min-height: 275px !important;
  }
}

.heading-container {
  padding: 16px;
  border-bottom: 1px solid rgba(67, 90, 111, 0.145);
}
.heading {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: #000;
}
`

const css = { __html: styles }

export function BallotStyles() {
  return [
    <link
      key={0}
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
    />,
    <style key={1} dangerouslySetInnerHTML={css} />
  ]
}

export default BallotStyles
