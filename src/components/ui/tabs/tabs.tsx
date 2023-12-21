import { useState } from 'react'

import s from './tabs.module.scss'

import { Typography } from '@/components/ui/typography'
import { TitleElement } from './components'

type TabsType = {
  title: Array<string>
  variant?: string
}

export const Tabs = ({ title }: TabsType) => {
  const [active, setActive] = useState(1)

  return (
    <Typography as={'ul'} className={s.container}>
      {title.map((el, i) => {
        return (
          <TitleElement
            active={active}
            index={i}
            key={i}
            length={title.length}
            setActive={setActive}
            title={el}
          />
        )
      })}
    </Typography>
  )
}
