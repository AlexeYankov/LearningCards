import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { resetFilter, useCreateDeckMutation } from '@/api/decks'
import { useAppDispatch } from '@/api/store'
import { ImageIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/ui/checkbox'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { CreateDeckArgType } from '@/types/decks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '../../decksPage.module.scss'

const schema = z.object({
  cover: z.any(),
  name: z.string().nonempty('Field is required').min(3).max(30),
})

type Form = z.infer<typeof schema>

export const DecksPageName = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [selectedImage, setSelectedImage] = useState('')
  const [open, setOpen] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<Form>({
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const [createDeck] = useCreateDeckMutation()

  const handleModalToggle = () => {
    setOpen(prevState => !prevState)
    reset()
    setSelectedImage('')
    dispatch(resetFilter())
  }

  const handeCheckedChange = () => {
    setIsPrivate(prevState => !prevState)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setSelectedImage(imageUrl)
      setValue('cover', [file])
    } else {
      setSelectedImage('')
      setValue('cover', [])
    }
  }

  const onSubmit = handleSubmit(data => {
    const form = new FormData()
    const { cover, name } = data

    if (cover && cover.length > 0) {
      form.append('cover', cover[0])
    }
    form.append('name', name.trim())
    form.append('isPrivate', String(isPrivate))

    if (name.trim() !== '' && name.length >= 3) {
      createDeck(form as unknown as CreateDeckArgType)
        .unwrap()
        .then(() => {
          handleModalToggle()
        })
        .catch(err => {
          toast.error(err.data.errorMessages[0].message)
        })
    } else {
      setOpen(true)
    }
  })

  return (
    <div className={s.container__pageName}>
      <Typography as={'h1'} variant={'large'}>
        {t('decks_list')}
      </Typography>
      <Modal
        hover={false}
        onOpenChange={handleModalToggle}
        open={open}
        triggerName={
          <Button type={'button'} variant={'primary'}>
            {t('add_new_deck')}
          </Button>
        }
      >
        <ModalTitle title={'Add New Pack'} />
        <form onSubmit={onSubmit}>
          <div className={s.contentComponents}>
            <img alt={''} className={s.img} src={selectedImage || ''} />
            <label className={s.changeCover} htmlFor={'input__file'}>
              <ImageIcon />
              Change Cover
            </label>
            <input
              className={s.inputFile}
              id={'input__file'}
              onChange={handleFileChange}
              type={'file'}
            />
            <TextField
              errorMessage={errors.name && errors.name?.message}
              inputId={'Name Pack'}
              label={'Name Pack'}
              placeholder={'Name'}
              {...register('name')}
            />
            <CheckBox
              IconID={'checkbox-unselected'}
              SelectedIconID={'checkbox-selected'}
              checked={isPrivate}
              height={'24'}
              label={'Private pack'}
              onChange={handeCheckedChange}
              width={'24'}
            />
          </div>
          <div className={`${s.contentBtn} ${s.contentBtns}`}>
            <Button
              classNameBtnBox={s.btnBox}
              onClick={handleModalToggle}
              type={'button'}
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              classNameBtnBox={s.btnBox}
              disabled={!!errors.name?.message}
              type={'submit'}
              variant={'primary'}
            >
              Add New Pack
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
