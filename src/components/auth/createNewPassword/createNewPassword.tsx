import { Typography } from '@/components/typography'
import { Button } from '@/components/button'
import s from './createNewPassword.module.scss'
import { TextField } from '../../textField'

export const CreateNewPassword = () => {
  return (
    <div className={s.box}>
      <Typography className={s.title} as={'span'} variant={'large'}>
        Create new password
      </Typography>
      <TextField password placeholder={'Create New Password'} label={'Password'} />
      <Typography className={s.text} as={'p'} variant={'body2'}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button className={s.button} variant={'primary'} fullWidth>
        <Typography as={'span'} variant={'subtitle2'}>
          Create New Password
        </Typography>
      </Button>
    </div>
  )
}
