import * as SliderRadix from '@radix-ui/react-slider'
import {useAppDispatch, useAppSelector} from '@/api/store.ts'
import {changeCurrentPage, changeMaxCardsCount, changeMinCardsCount,} from '@/api/decks/decks.reducer.ts'
import {forwardRef, useEffect, useState} from 'react'
import s from './slider.module.scss'
import {Label} from '@/components/ui/label'

type SliderProps = {}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, forwardedRef) => {
    const dispatch = useAppDispatch()
    const maxCardsCount = useAppSelector(state => state.decks.maxCardsCount)
    const minCardsCount = useAppSelector(state => state.decks.minCardsCount)

    const [values, setValues] = useState([minCardsCount, maxCardsCount])


    const onValuesCountChange = (values: number[]) => {
        localStorage.removeItem('page')
        dispatch(changeMinCardsCount({minCardsCount: values[0]}))
        dispatch(changeMaxCardsCount({maxCardsCount: values[1]}))
        dispatch(changeCurrentPage({currentPage: 1}))
    }

    useEffect(() => {
        setValues([minCardsCount, maxCardsCount])
    }, [maxCardsCount, minCardsCount])

    return (
        <div className={s.container}>
            <Label label={values[0].toString()} className={s.label}/>
            <SliderRadix.Root
                className={s.sliderRoot}
                ref={forwardedRef}
                minStepsBetweenThumbs={1}
                max={61}
                value={values}
                onValueChange={setValues}
                onValueCommit={onValuesCountChange}
                {...props}
            >
                <SliderRadix.Track className={s.sliderTrack}>
                    <SliderRadix.Range className={s.sliderRange}/>
                </SliderRadix.Track>
                <SliderRadix.Thumb className={s.sliderThumb}/>
                <SliderRadix.Thumb className={s.sliderThumb}/>
            </SliderRadix.Root>
            <Label label={values[1].toString()} className={s.label}/>
        </div>
    )
})
