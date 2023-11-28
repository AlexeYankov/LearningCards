import { useState } from 'react'

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
  name: z.string(),
  isPrivate: z.any(),
})

type Form = z.infer<typeof schema>

export const PageName = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const { register, setValue, handleSubmit } = useForm<Form>()

  const [createDeck, { error, isError, reset }] = useCreateDeckMutation()

  const handleModalToggle = () => {
    setOpen(prevState => !prevState)
    reset()
  }

  const handeCheckedChange = () => {
    setIsPrivate(prevState => !prevState)
  }

  // @ts-ignore
  const errorMessage = error?.data?.errorMessages[0].message

  const onSubmit = handleSubmit(data => {
    const form = new FormData()

    form.append('cover', data.cover[0])
    form.append('name', data.name)
    if (data.name.trim() !== '' && data.name.length >= 3) {
      createDeck(form)
      setOpen(false)
      setValue('name', '')
      dispatch(resetFilter())
    } else {
      setOpen(true)
    }
  })

  // const handleAddNewPackClick = (event: FormEvent) => {
  //   event.preventDefault()
  //   createDeck({ name: value, isPrivate })
  //   if (value.length < 3) {
  //     setOpen(true)
  //   } else {
  //     setValue('')
  //     setOpen(false)
  //     dispatch(resetFilter())
  //   }
  // }

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
            <img className={f.img} alt={'card image'} src={'control'} />
            <label htmlFor="input__file" className={f.changeCover}>
              <Image />
              Change Cover
            </label>
            <input className={f.inputFile} id={'input__file'} type="file" {...register('cover')} />

            <TextField
              inputId={'Name Pack'}
              label={'Name Pack'}
              placeholder={'Name'}
              errorMessage={errorMessage}
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
              disabled={isError}
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
