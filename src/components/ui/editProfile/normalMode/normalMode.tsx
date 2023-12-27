import s from './../editProfile.module.scss'
import { Typography } from '@/components/ui/typography'
import { EditIcon, LogoutIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { changeEditModeProfile, changeTitleProfile } from '@/api/profile'
import { useAppDispatch } from '@/api/store'
import { useLogOutMutation } from '@/api/auth'
import { useTranslation } from 'react-i18next'

type Props = {
  name: string
  email?: string
}
export const NormalMode = ({ name, email }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [logout] = useLogOutMutation()
  const activateEditMode = () => {
    dispatch(changeEditModeProfile({ editMode: true }))
    dispatch(changeTitleProfile({ title: name }))
  }
  const onClickLogOut = () => {
    logout()
  }
  return (
    <>
      <div className={s.nameBlock}>
        <Typography variant={'heading1'} className={s.name}>
          {name || 'name'}
        </Typography>
        <div onClick={activateEditMode} className={s.editIcon}>
          <EditIcon />
        </div>
      </div>
      <div className={s.email}>{email || 'Email'}</div>
      <div>
        <Button
          onClick={onClickLogOut}
          icon={<LogoutIcon />}
          children={t('logout')}
          variant={'secondary'}
        />
      </div>
    </>
  )
}
