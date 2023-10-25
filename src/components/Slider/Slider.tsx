// import { useState } from 'react'
//
// import * as Slider from '@radix-ui/react-slider'
//
// import './style.css'
//
// export const SliderDemo = () => {
//   const [values, setValues] = useState([0, 100])
//
//   const handleChange = (newValues: any) => {
//     setValues(newValues)
//   }
//
//   return (
//     <div>
//       <Slider.Root
//         className={'SliderRoot'}
//         max={100}
//         onChange={handleChange}
//         step={1}
//         value={values}
//       >
//         <div className={'slider'}>
//           <Slider.Track className={'SliderTrack'}>
//             <Slider.Range className={'SliderRange'} />
//           </Slider.Track>
//           <Slider.Thumb aria-label={'Volume'} className={'SliderThumb'} />
//           <Slider.Thumb aria-label={'Volume'} className={'SliderThumb'} />
//         </div>
//
//         <div className={'value'}>
//           <span>{values[0]}</span>
//           <span>{values[1]}</span>
//         </div>
//       </Slider.Root>
//     </div>
//   )
// }
//

// export const SliderDemo = () => {
//   return (
//     <>
//       <Slider defaultValue={30}>
//         <Label>Opacity</Label>
//         <SliderOutput />
//         <SliderTrack>
//           <SliderThumb />
//         </SliderTrack>
//       </Slider>
//     </>
//   )
// }
import {
  // Label,
  Slider,
  SliderOutput,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components'

import './slider.css'

interface MySliderProps<T> extends SliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function SliderDemo2<T extends number | number[]>({
  // label,
  thumbLabels,
  ...props
}: MySliderProps<T>) {
  return (
    <Slider {...props}>
      {/*<Label>{label}</Label>*/}

      <SliderOutput>
        {({ state }) => (
          <div className={'react-aria-SliderOutput'}>
            <div className={'value1'}>{state.getThumbValueLabel(0)}</div>
            <div className={'value2'}>{state.getThumbValueLabel(1)}</div>
          </div>
        )}
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

export const SliderDemo = () => {
  return <SliderDemo2 defaultValue={[30, 60]} label={'Range'} thumbLabels={['start', 'end']} />
}
