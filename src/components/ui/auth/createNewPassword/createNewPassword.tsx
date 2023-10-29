import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './createNewPassword.module.scss'

import { TextField } from '../../textField'

export const CreateNewPassword = () => {
  return (
    <div className={s.box}>
      <Typography as={'span'} className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <TextField
        inputId={'Password'}
        label={'Password'}
        password
        placeholder={'Create New Password'}
      />
      <Typography as={'p'} className={s.text} variant={'body2'}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button className={s.button} fullWidth variant={'primary'}>
        <Typography as={'span'} variant={'subtitle2'}>
          Create New Password
        </Typography>
      </Button>
    </div>
  )
}
