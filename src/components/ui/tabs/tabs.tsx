import { useState } from 'react'
import { Typography } from '../typography'
import { TitleElement } from './components/titleElement'

import s from './tabs.module.scss'

type TabsType = {
  title: Array<string>
  variant?: string
}

export const Tabs = ({ title }: TabsType) => {
  const [active, setActive] = useState(0)
  return (
    <Typography as="ul" className={s.container}>
      {title.map((el, i) => {
        return (
          <TitleElement
            key={i}
            title={el}
            index={i}
            length={title.length}
            setActive={setActive}
            active={active}
          />
        )
      })}
    </Typography>
  )
}
