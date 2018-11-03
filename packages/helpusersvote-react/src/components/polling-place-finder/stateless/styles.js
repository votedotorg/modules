import React from 'react'
import PlanMakerStyles from '../../plan-maker/stateless/styles'

const styles = `
.huv-container {
  padding-bottom: 16px;
  font-family: SF UI Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
.huv-container .gray,
.huv-container .light-gray {
  color: #69778b;
}
.outdent {
  margin: 0 2px;
}
.huv-select-container {
  position: relative;
}
.huv-select-container::after {
  position: absolute;
  display: block;
  top: 50%;
  right: 0;
  width: 0; 
  height: 0; 
  content: '';
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #425a70;
  transform: translateX(-12px) translateY(-50%);
}
.huv-select--small {
  height: 27px;
}
.huv-button {
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  vertical-align: middle;
  text-decoration: none;
  transition: box-shadow 80ms ease-in-out;
  appearance: none;
  -webkit-appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  background: #fff;
  color: #425a70;
  font-weight: 500;
  line-height: 32px;
  height: 32px;
  padding: 0 16px;
  min-width: 80px;
  border-radius: 3px;
  font-size: 12px;
  user-select: none;
  box-sizing: border-box;
  background-image: -webkit-linear-gradient(to bottom, #FFFFFF, #F4F5F7);
  background-image: -moz-linear-gradient(to bottom, #FFFFFF, #F4F5F7);
  background-image: linear-gradient(to bottom, #FFFFFF, #F4F5F7);
  box-shadow: rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset;
  -webkit-transition: box-shadow 80ms ease-in-out, background 80ms ease-in-out;
  -moz-transition: box-shadow 80ms ease-in-out, background 80ms ease-in-out;
}
.huv-button:not([disabled]):not([data-disabled]):focus,
.huv-button:not([disabled]):not([data-disabled]):focus {
  z-index: 2;
  box-shadow: 0 0 0 3px rgba(1,108,209,0.301), inset 0 0 0 1px rgba(67,90,111,0.204), inset 0 -1px 1px 0 rgba(67,90,111,0.204);
}
.huv-button:hover {
  background-image: -webkit-linear-gradient(to bottom, #FAFBFB, #EAECEE);
  background-image: -moz-linear-gradient(to bottom, #FAFBFB, #EAECEE);
  background-image: linear-gradient(to bottom, #FAFBFB, #EAECEE);
}
.huv-button:active {
  background-image: none;
  background-color: rgba(16, 112, 202, 0.09);
  box-shadow: rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px 1px 1px 0px inset;
}
.huv-button--blue:not([disabled]) {
  color: #fff;
  background-color: #015ebd;
  box-shadow: inset 0 0 0 1px rgba(67,90,111,0.204), inset 0 -1px 1px 0 rgba(67,90,111,0.204);
  background-image: -webkit-linear-gradient(to top, #0165c7, #0173df);
  background-image: -moz-linear-gradient(to top, #0165c7, #0173df);
  background-image: linear-gradient(to bottom, #0788DE, #116AB8);
}
.huv-button--blue:not([disabled]):hover {
  background-image: -webkit-linear-gradient(to top, #015ebd, #016cd1);
  background-image: -moz-linear-gradient(to top, #015ebd, #016cd1);
  background-image: linear-gradient(to top, #015ebd, #016cd1);
}
.huv-button--blue:not([disabled]):active {
  box-shadow: inset 0 0 0 1px rgba(67,90,111,0.204), inset 0 -1px 1px 0 rgba(67,90,111,0.204);
  background-image: -webkit-linear-gradient(to top, #0055b0, #004ca3);
  background-image: -moz-linear-gradient(to top, #0055b0, #004ca3);
  background-image: linear-gradient(to top, #0055b0, #004ca3);
}
.huv-button[disabled] {
  pointer-events: none;
  opacity: 0.8;
}
.huv-shadow {
  box-shadow: rgba(67, 90, 111, 0.416) 0px 0px 1px, rgba(67, 90, 111, 0.3) 0px 2px 4px -2px;
}
.huv-address-form {
  background: white;
  color: #303E50;
  overflow: hidden;
  box-shadow: rgba(67, 90, 111, 0.416) 0px 0px 1px, rgba(67, 90, 111, 0.3) 0px 2px 4px -2px;
  font-size: 16px;
  border-radius: 4px;
}
.huv-address-form-content {
  padding: 16px;
}
.address-form-auto-complete-example {
  padding: 4px .5rem;
  font-size: 10px;
  color: #596573;
}
.report-error {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 8px 16px;
  color: #69778b;
}
.report-error:hover, .report-error:focus {
  text-decoration: underline;
}
.huv-container input[type="text"] {
  transition: 0.125s ease-out box-shadow;
}
.huv-container input[type="text"]:not([disabled]):not([data-disabled]):focus,
.huv-container input[type="text"]:not([disabled]):not([data-disabled]):focus {
  outline: none;
  z-index: 2;
  border: 1px solid #579ad9;
  box-shadow: 0 0 0 3px rgba(1,108,209,0.301);
}
/**
 * Autocomplete
 */
.huv-autocomplete-option:last-of-type {
  border-bottom: 0;
}
.huv-autocomplete-option:hover {
  background: rgba(67, 90, 111, 0.04);
}
.huv-autocomplete-option:active {
  background: rgba(16, 112, 202, 0.06);
}
.huv-autocomplete-option--active,
.huv-autocomplete-option--active:hover,
.huv-autocomplete-option--active:active {
  background: rgba(16, 112, 202, 0.06);
}
/**
 * Directions.
 */
.directions {
  position: relative;
  overflow: hidden;
  box-shadow: rgba(67, 90, 111, 0.416) 0px 0px 1px, rgba(67, 90, 111, 0.3) 0px 2px 4px -2px;
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
  max-width: 320px;
}
@media(min-width: 330px) {
  .directions-info {
    min-width: 260px;
  }
}
.directions-label {
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 19px;
  text-transform: uppercase;
  font-weight: bold;
  color: #69778b;
}

.directions-address-line1 {
  font-weight: 600;
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
  min-height: 370px;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.directions-map.error {
  background: #fef7f7;
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
/*
 * Switcher
 */
.huv-switcher {
  display: flex;
}
.huv-switcher-item {
  padding: 6px 10px;
  min-width: 100px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  user-select: none;
  text-align: center;
  color: rgb(66, 90, 112);
  background-color: white;
  background-image: linear-gradient(rgb(255, 255, 255), rgb(244, 245, 247));
  box-shadow: rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset,
              rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset;
  box-sizing: border-box;
  transition: box-shadow 80ms ease-in-out 0s;
}
.huv-switcher-item:hover {
  background-image: linear-gradient(rgb(250, 251, 251), rgb(234, 236, 238));
}
.huv-switcher-item:active {
  background-image: none;
  background-color: rgba(16, 112, 202, 0.09);
  box-shadow: rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset,
              rgba(67, 90, 111, 0.06) 0px 1px 1px 0px inset;
}
.huv-switcher-item--active,
.huv-switcher-item--active:hover,
.huv-switcher-item--active:active {
  cursor: default;
  background-image: none;
  background-color: rgba(16, 112, 202, 0.09);
  box-shadow: rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset,
              rgba(67, 90, 111, 0.06) 0px 1px 1px 0px inset;
}
.huv-switcher-item:first-of-type {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.huv-switcher-item:not(:first-of-type) {
  margin-left: -1px;
}
.huv-switcher-item:last-of-type {
  border-left: none;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}`

const css = { __html: styles }

export function PollingPlaceFinderStyles() {
  return [
    <link
      key={0}
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
    />,
    <style key={1} dangerouslySetInnerHTML={css} />,
    <PlanMakerStyles key={2} />
  ]
}

export default PollingPlaceFinderStyles
