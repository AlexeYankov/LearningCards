import { ChangeEvent, FormEvent } from 'react'
import s from './editProfile.module.scss'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textField'
import { UpdateUserArgsType, useMeQuery, useUpdateUserMutation } from '@/api/auth'
import { Photo } from './photo'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { changeEditModeProfile, changeTitleProfile } from '@/api/profile'
import { NormalMode } from './normalMode'
import { toast } from 'react-toastify'
import { ErrorComponent } from '@/utils/toastify/Error'
import { BackLink } from '@/components/ui/backLink'
import { useTranslation } from 'react-i18next'

export const EditProfile = () => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const title = useAppSelector(state => state.profile.title)
  const editMode = useAppSelector(state => state.profile.editMode)

  const { data } = useMeQuery()
  const [update] = useUpdateUserMutation()
  const uploadContent = (event: ChangeEvent<HTMLInputElement>) => {
    const bodyFormData = new FormData()
    if (event.target.files) {
      const file = event.target.files[0]
      const fileSizeInMB = file.size / (1024 * 1024) // Размер файла в МБ
      if (fileSizeInMB > 1) {
        toast.error('Max image size 1MB')
        return
      }
      bodyFormData.append('avatar', file)
      toast.promise(update(bodyFormData as UpdateUserArgsType), {
        pending: 'Uploading...',
        success: 'Your avatar successfully changed',
        error: 'An error occurred while uploading',
      })
    }
  }
  const activateViewMode = () => {
    dispatch(changeEditModeProfile({ editMode: false }))

    if (!(title.trim() === '')) {
      dispatch(changeTitleProfile({ title }))

      if (title !== data?.name) {
        toast.promise(update({ name: title }), {
          pending: 'Uploading...',
          success: 'Your name successfully changed',
          error: 'An error occurred while uploading',
        })
      }
    }
  }
  const handleOnchangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTitleProfile({ title: e.currentTarget.value }))
  }
  const handleClick = (e: FormEvent<HTMLFormElement>) => e.preventDefault()

  return (
    <>
      <ErrorComponent />
      <BackLink title={t('back_to_decks_list')} to={''} />
      <Card>
        <div className={s.cards}>
          <Typography as={'span'} className={s.text} variant={'large'}>
            {t('personal_info')}
          </Typography>
          <Photo src={data?.avatar} onChange={uploadContent} />
          {!editMode && <NormalMode name={data?.name || t('user_name')} email={data?.email} />}
          {editMode && (
            <form className={s.form} onSubmit={handleClick}>
              <TextField
                maxLength={25}
                autoFocus
                label={t('nickname')}
                type={'text'}
                className={s.textField}
                value={title}
                onChange={handleOnchangeTitle}
              />
              <Button
                type={'submit'}
                children={t('save_changes')}
                className={s.button}
                variant={'primary'}
                onClick={activateViewMode}
              />
            </form>
          )}
        </div>
      </Card>
    </>
  )
}
