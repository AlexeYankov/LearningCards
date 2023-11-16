import { FC } from 'react'
import s from './emptyPack.module.scss'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

type EmptyPackPropsType = {
  packTitle: string
}

export const EmptyPack: FC<EmptyPackPropsType> = ({ packTitle }) => {
  return (
    <>
      <Typography as={'h1'} variant={'large'} className={s.title}>
        {packTitle}
      </Typography>
      <Typography as={'p'} variant={'body1'} className={s.description}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <Button className={s.button}>Add New Card</Button>
    </>
  )
}
