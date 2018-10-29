import React from 'react'
import Button from '../../../polling-place-finder/stateless/button'

export function Step1({ onSelect }) {
  const onClickSelect = key => () => onSelect(key)

  return (
    <div>
      <Button classes="mr3" blue={false} onClick={onClickSelect('walk')}>
        Walk (7 min)
      </Button>
      <Button classes="mr3" blue={false} onClick={onClickSelect('drive')}>
        Drive (2 min)
      </Button>
      <Button classes="mr3" blue={false} onClick={onClickSelect('bike')}>
        Bike (3 min)
      </Button>
      <Button blue={false} onClick={onClickSelect('transit')}>
        Bus/Train (11 min)
      </Button>
    </div>
  )
}

export default Step1
