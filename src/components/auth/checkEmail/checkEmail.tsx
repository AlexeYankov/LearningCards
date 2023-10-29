import { Typography } from '@/components/typography'
import { Button } from '@/components/button'
import s from './checkEmail.module.scss'
import { Email } from '@/asserts/icons/components/Email'

export const CheckEmail = () => {
  return (
    <div className={s.box}>
      <Typography className={s.title} as={'span'} variant={'large'}>
        Check Email
      </Typography>
      <div className={s.icon}>
        <Email />
      </div>
      <Typography className={s.text} as={'p'} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button className={s.button} variant={'primary'} fullWidth>
        <Typography as={'span'} variant={'subtitle2'}>
          Back to Sign In
        </Typography>
      </Button>
    </div>
  )
}
