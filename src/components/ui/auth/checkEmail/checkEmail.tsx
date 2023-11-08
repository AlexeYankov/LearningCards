import { useNavigate } from 'react-router-dom'

import { Email } from '@/asserts/icons/components/Email'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './checkEmail.module.scss'

export const CheckEmail = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <Card className={s.box}>
      <Typography as={'span'} className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <div className={s.icon}>
        <Email />
      </div>
      <Typography as={'p'} className={s.text} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button className={s.button} fullWidth onClick={goToLogin} variant={'primary'}>
        <Typography as={'span'} variant={'subtitle2'}>
          Back to Sign In
        </Typography>
      </Button>
    </Card>
  )
}
