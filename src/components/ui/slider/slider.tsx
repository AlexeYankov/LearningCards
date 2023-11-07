import * as SliderRadix from '@radix-ui/react-slider'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { changeMaxCardsCount, changeMinCardsCount } from '@/api/decks/pagination.reducer'
import { forwardRef, useState } from 'react'
import s from './slider.module.scss'
import { Label } from '@/components/ui/label'

type SliderProps = {}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, forwardedRef) => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)

  const [value, setValue] = useState([minCardsCount, maxCardsCount])
  const onValuesCountChange = (values: number[]) => {
    dispatch(changeMinCardsCount({ minCardsCount: values[0] }))
    dispatch(changeMaxCardsCount({ maxCardsCount: values[1] }))
  }

  return (
    <div className={s.container}>
      <Label label={value[0].toString()} className={s.label} />
      <SliderRadix.Root
        ref={forwardedRef}
        max={61}
        minStepsBetweenThumbs={1}
        value={value}
        onValueChange={setValue}
        onValueCommit={onValuesCountChange}
        className={s.sliderRoot}
        {...props}
      >
        <SliderRadix.Track className={s.sliderTrack}>
          <SliderRadix.Range className={s.sliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.sliderThumb} />
        <SliderRadix.Thumb className={s.sliderThumb} />
      </SliderRadix.Root>
      <Label label={value[1].toString()} className={s.label} />
    </div>
  )
})
