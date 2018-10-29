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
.footer-container {
  padding: 16px;
  border-top: 1px solid rgba(67, 90, 111, 0.145);
}
`

const css = { __html: styles }

export function PlanMakerStyles() {
  return <style dangerouslySetInnerHTML={css} />
}

export default PlanMakerStyles
