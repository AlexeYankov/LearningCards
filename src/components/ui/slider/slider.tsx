import { forwardRef, useEffect, useState } from 'react'

import { changeCurrentPage, changeMaxCardsCount, changeMinCardsCount } from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { Typography } from '@/components/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, forwardedRef) => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(state => state.decks.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.decks.minCardsCount)

  const [values, setValues] = useState([minCardsCount, maxCardsCount])

  const onValuesCountChange = (values: number[]) => {
    localStorage.removeItem('page')
    dispatch(changeMinCardsCount({ minCardsCount: values[0] }))
    dispatch(changeMaxCardsCount({ maxCardsCount: values[1] }))
    dispatch(changeCurrentPage({ currentPage: 1 }))
  }

  useEffect(() => {
    setValues([minCardsCount, maxCardsCount])
  }, [maxCardsCount, minCardsCount])

  return (
    <div className={s.container}>
      <Typography className={s.label} variant={'body2'}>
        {values[0].toString()}
      </Typography>
      <SliderRadix.Root
        className={s.sliderRoot}
        max={61}
        minStepsBetweenThumbs={1}
        onValueChange={setValues}
        onValueCommit={onValuesCountChange}
        ref={forwardedRef}
        value={values}
        {...props}
      >
        <SliderRadix.Track className={s.sliderTrack}>
          <SliderRadix.Range className={s.sliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.sliderThumb} />
        <SliderRadix.Thumb className={s.sliderThumb} />
      </SliderRadix.Root>
      <Typography className={s.label} variant={'body2'}>
        {values[1].toString()}
      </Typography>
    </div>
  )
})
