import { useNavigate } from 'react-router-dom'
import { EmailIcon } from '@/asserts/icons/components/EmailIcon.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from './checkEmail.module.scss'
import {useMeQuery} from "@/api/auth-api/auth.api.ts";

export const CheckEmail = () => {
    const { data } = useMeQuery()
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
        <EmailIcon />
      </div>
      <Typography as={'p'} className={s.text} variant={'body2'}>
        We’ve sent an Email with instructions to {data?.email}
      </Typography>
      <Button className={s.button} fullWidth onClick={goToLogin} variant={'primary'}>
        <Typography as={'span'} variant={'subtitle2'}>
          Back to Sign In
        </Typography>
      </Button>
    </Card>
  )
}
