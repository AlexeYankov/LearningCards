import s from './select.module.scss'

import sprite from '../../../../asserts/sprite.svg'
import { useState } from 'react'

type SelectType = {
  // ArrowID: string
  // height: number
  // pages: number
  // viewBox: string
  options: Array<number>
}

export const Select = ({ options }: SelectType) => {
  const [startValue, setValue] = useState(options[options.length - 1])
  const optionsForRender = options.map(el => {
    if (el !== startValue) {
      return (
        <option key={crypto.randomUUID()} value={el}>
          {el}
        </option>
      )
    }
  })
  const optionChangeHandler = () => {
    // setValue(options[0])
  }
  return (
    <div className={s.selectContainer}>
      <select onClick={optionChangeHandler}>
        <option key={crypto.randomUUID()} value={''}>
          {startValue}
        </option>
        {optionsForRender}

        {/* <option key={crypto.randomUUID()} value={startValue}>
          {startValue}
        </option> */}
      </select>
    </div>
  )
}
