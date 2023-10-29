import s from './select.module.scss'

type SelectType = {
  // ArrowID: string
  // height: number
  // pages: number
  // viewBox: string
  options: Array<number>
}

export const Select = ({ options }: SelectType) => {
  const optionsForRender = options.map(el => {
    if (el !== 100) {
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
          {100}
        </option>
        {optionsForRender}

        {/* <option key={crypto.randomUUID()} value={startValue}>
          {startValue}
        </option> */}
      </select>
    </div>
  )
}
