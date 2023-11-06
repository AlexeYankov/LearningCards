import { Slider, SliderOutput, SliderProps, SliderThumb, SliderTrack } from 'react-aria-components'

import './slider.scss'

interface MySliderProps<T> extends SliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export const SliderDemo = <T extends number | number[]>({
  // label,
  thumbLabels,
  ...props
}: MySliderProps<T>) => (
  <Slider {...props}>
    <SliderOutput>
      {({ state }) => (
        <div className={'react-aria-SliderOutput'}>
          <div className={'value1'}>{state.getThumbValueLabel(0)}</div>
          <div className={'value2'}>{state.getThumbMaxValue(0)}</div>
        </div>
      )}
    </SliderOutput>
    <SliderTrack>
      {({ state }) =>
        state.values.map((_, i) => <SliderThumb aria-label={thumbLabels?.[i]} index={i} key={i} />)
      }
    </SliderTrack>
  </Slider>
)
