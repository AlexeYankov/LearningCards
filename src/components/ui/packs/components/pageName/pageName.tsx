import { ChangeEvent, useState } from 'react'

import { useCreateDeckMutation } from '@/api/decks/decks.api'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/ui/checkbox'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../packsPage.module.scss'
import { useAppDispatch } from '@/api/store.ts'
import { Image } from '@/asserts/icons/components/Image.tsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { resetFilter } from '@/api/decks/pagination.reducer.ts'

const schema = z.object({
  cover: z.array(z.instanceof(File)),
  name: z.string().min(3),
  isPrivate: z.boolean().default(false),
})

type Form = z.infer<typeof schema>

export const PageName = () => {
  const dispatch = useAppDispatch()
  const [selectedImage, setSelectedImage] = useState('')
  const [open, setOpen] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Form>()
  const [createDeck] = useCreateDeckMutation()

  const handleModalToggle = () => {
    setOpen(prevState => !prevState)
    setValue('name', '')
    setValue('cover', [])
    clearErrors('name')
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
    if (data.cover && data.cover.length > 0) {
      form.append('cover', data.cover[0])
    }
    form.append('name', data.name)
    form.append('isPrivate', String(isPrivate))

    if (data.name.trim() !== '' && data.name.length >= 3) {
      // @ts-ignore
      createDeck(form)
      handleModalToggle()
    } else {
      setError('name', { message: 'String must contain at least 3 character(s)' })
      setOpen(true)
    }
  })

  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'}>
        Packs list
      </Typography>
      <Modal
        onOpenChange={handleModalToggle}
        open={open}
        triggerName={
          <Button type={'button'} variant={'primary'}>
            Add New Pack
          </Button>
        }
      >
        <ModalTitle title={'Add New Pack'} />
        <form onSubmit={onSubmit}>
          <div className={f.contentComponents}>
            <img className={f.img} src={selectedImage || ''} />
            <label htmlFor="input__file" className={f.changeCover}>
              <Image />
              Change Cover
            </label>
            <input
              className={f.inputFile}
              id={'input__file'}
              type="file"
              onChange={handleFileChange}
            />
            <TextField
              inputId={'Name Pack'}
              label={'Name Pack'}
              placeholder={'Name'}
              errorMessage={errors.name?.message}
              {...register('name')}
            />
            <CheckBox
              IconID={'checkbox-unselected'}
              SelectedIconID={'checkbox-selected'}
              checkboxId={'Private Pack'}
              height={'24'}
              label={'Private pack'}
              width={'24'}
              checked={isPrivate}
              onChange={handeCheckedChange}
            />
          </div>
          <div className={`${f.contentBtn} ${f.contentBtns}`}>
            <Button
              classNameBtnBox={f.btnBox}
              onClick={handleModalToggle}
              variant={'secondary'}
              type={'button'}
            >
              Cancel
            </Button>
            <Button
              classNameBtnBox={f.btnBox}
              variant={'primary'}
              disabled={!!errors.name?.message}
              type={'submit'}
            >
              Add New Pack
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
