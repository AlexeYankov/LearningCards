import { useEffect, useState } from 'react'

import s from './tabs.module.scss'

import { Typography } from '@/components/ui/typography'
import { TitleElement } from './components'

type TabsType = {
  title: Array<string>
  variant?: string
}

export const Tabs = ({ title }: TabsType) => {
  const [active, setActive] = useState(() => {
    const savedActive = localStorage.getItem('active')
    return savedActive ? Number(savedActive) : 1
  })

  useEffect(() => {
    localStorage.setItem('active', String(active))
  }, [active])

  const handleSetActive = (value: number) => {
    setActive(value)
  }

  return (
    <Typography as={'ul'} className={s.container}>
      {title.map((el, i) => {
        return (
          <TitleElement
            active={active}
            index={i}
            key={i}
            length={title.length}
            setActive={handleSetActive}
            title={el}
          />
        )
      })}
    </Typography>
  )
}
