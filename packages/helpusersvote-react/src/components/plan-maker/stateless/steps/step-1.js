import React from 'react'
import Button from '../../../polling-place-finder/stateless/button'

export function Step1({ onSelect }) {
  const onClickSelect = key => () => onSelect(key)

  return (
    <div>
      <Button
        classes="mr3 mt1 mb2"
        blue={false}
        onClick={onClickSelect('walk')}
      >
        Walk
      </Button>
      <Button
        classes="mr3 mt1 mb2"
        blue={false}
        onClick={onClickSelect('drive')}
      >
        Drive
      </Button>
      <Button
        classes="mr3 mt1 mb2"
        blue={false}
        onClick={onClickSelect('bike')}
      >
        Bike
      </Button>
      <Button classes="mt1 mb2" blue={false} onClick={onClickSelect('transit')}>
        Bus/Train
      </Button>
    </div>
  )
}

export default Step1
