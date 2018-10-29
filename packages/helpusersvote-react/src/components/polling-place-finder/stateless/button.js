import React from 'react'
import cx from 'classnames'

export function Button({ blue, classes, style, children, ...props }) {
  return (
    <button
      className={cx(
        'huv-button',
        blue && 'huv-button--blue',
        classes && classes
      )}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  blue: true
}

export default Button
