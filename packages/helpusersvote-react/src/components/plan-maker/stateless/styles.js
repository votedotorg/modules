import React from 'react'

const styles = `
.plan-maker {
  background: white;
  color: #303E50;
  overflow: hidden;
  box-shadow: rgba(67, 90, 111, 0.416) 0px 0px 1px, rgba(67, 90, 111, 0.3) 0px 2px 4px -2px;
  font-size: 16px;
  border-radius: 4px;
}
.plan-maker-content {
  padding: 16px;
}
.plan-maker input {
  transition: 0.125s ease-out box-shadow;
}
.plan-maker input:not([disabled]):not([data-disabled]):focus,
.plan-maker input:not([disabled]):not([data-disabled]):focus {
  outline: none;
  z-index: 2;
  border: 1px solid #579ad9;
  box-shadow: 0 0 0 3px rgba(1,108,209,0.301);
}
.plan-maker .footer-container {
  padding: 16px;
  background: #F9F9FB;
  border-top: 1px solid rgba(67, 90, 111, 0.145);
}

.add-to-calendar {
  display: inline-block;
  margin-bottom: 0;
  padding: 0;
  width: 162px;
  box-sizing: border-box;
}
.react-add-to-calendar {
  -webkit-font-smoothing: antialiased;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  position: relative;
}
.react-add-to-calendar__button {
  display: block;
  padding: 0 16px;
}
.react-add-to-calendar__dropdown {
  position: absolute;
  margin-top: 4px;
  width: 162px;
  border-radius: 2px;
  box-shadow: rgba(67, 90, 111, 0.416) 0px 0px 1px, rgba(67, 90, 111, 0.3) 0px 2px 4px -2px;
  background-color: #fff;
  text-align: left;
  overflow: hidden;
}
.react-add-to-calendar__dropdown ul {
  margin: 0;
  padding: 0;
}
.react-add-to-calendar__dropdown a,
.react-add-to-calendar__dropdown a:hover,
.react-add-to-calendar__dropdown a:visited {
  display: block;
  padding: 0 6px;
  color: #357edd;
  text-decoration: none;
}
.react-add-to-calendar__dropdown a:hover {
  background: #F7F9FD;
}
.react-add-to-calendar__dropdown li {
  padding: 0;
} 
.react-add-to-calendar__dropdown i {
  margin-right: 5px;
}
`

const css = { __html: styles }

export function PlanMakerStyles() {
  return <style dangerouslySetInnerHTML={css} />
}

export default PlanMakerStyles
