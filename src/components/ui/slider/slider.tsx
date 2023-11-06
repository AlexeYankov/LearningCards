import { Slider, SliderOutput, SliderProps, SliderThumb, SliderTrack } from 'react-aria-components'

import './slider.scss'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { changeMaxCardsCount, changeMinCardsCount } from '@/api/decks/pagination.reducer'

interface MySliderProps extends SliderProps<number[]> {
  label?: string
  thumbLabels?: string[]
}

export const SliderDemo = ({ thumbLabels, ...props }: MySliderProps) => {
  const dispatch = useAppDispatch()

  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)

  const onValuesCountChange = (minCardsCount: number, maxCardsCount: number) => {
    dispatch(changeMinCardsCount({ minCardsCount }))
    dispatch(changeMaxCardsCount({ maxCardsCount }))
  }

  return (
    <Slider
      maxValue={61}
      defaultValue={[minCardsCount, maxCardsCount]}
      onChangeEnd={state => onValuesCountChange(state[0], state[1])}
      {...props}
    >
      <SliderOutput>
        {({ state }) => {
          return (
            <div className={'react-aria-SliderOutput'}>
              <div className={'value1'}>{state.values[0]}</div>
              <div className={'value2'}>{state.values[1]}</div>
            </div>
          )
        }}
      </SliderOutput>
      <SliderTrack>
        {({ state }) =>
          state.values.map((_, i) => (
            <SliderThumb aria-label={thumbLabels?.[i]} index={i} key={i} />
          ))
        }
      </SliderTrack>
    </Slider>
  )
}
