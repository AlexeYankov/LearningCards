import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { EmailIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './checkEmail.module.scss'

export const CheckEmail = () => {
  const { email } = useParams()
  const { t } = useTranslation()

  return (
    <Card className={s.box}>
      <Typography as={'span'} className={s.title} variant={'large'}>
        {t('check_email')}
      </Typography>
      <div className={s.icon}>
        <EmailIcon />
      </div>
      <Typography as={'p'} className={s.text} variant={'body2'}>
        {/*We’ve sent an Email with instructions to {(email && email) || 'email'}*/}
        {t('Weve_sent_Email_instructions') + (email && email) || 'email'}
      </Typography>
      <Button className={s.button} fullWidth variant={'primary'}>
        <Typography as={Link} to={'/login'} variant={'subtitle2'}>
          {t('back_to_sign_in')}
        </Typography>
      </Button>
    </Card>
  )
}
