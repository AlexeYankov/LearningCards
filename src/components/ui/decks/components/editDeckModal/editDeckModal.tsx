import { useUpdateDeckMutation } from '@/api/decks'
import { useForm } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { EditIcon } from '@/asserts/icons'
import s from '@/components/ui/decks/decksPage.module.scss'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'
import { z } from 'zod'
import { handleFileChange } from '@/components/ui/cards'
import { ImageSelector } from '@/components/ui/imageSelector'
import { useTranslation } from 'react-i18next'
import { ResponseDeckType } from '@/types/decks'

const schema = z.object({
  cover: z.array(z.instanceof(File)),
  name: z.string().min(3),
  isPrivate: z.boolean().default(false),
})

type Form = z.infer<typeof schema>

export type EditDeckModalProps = {
  deck: ResponseDeckType
  open?: boolean
  setOpen?: (open: boolean) => void
  hover?: boolean
}

export const EditDeckModal = ({ deck, open, setOpen, hover }: EditDeckModalProps) => {
  const { t } = useTranslation()

  const [updateDeck] = useUpdateDeckMutation()
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()

  const [selectedImage, setSelectedImage] = useState(deck.cover)
  const [isPrivate, setIsPrivate] = useState(false)

  const [openLocal, setOpenLocal] = useState(false)

  const handleEditFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event: event,
      setSelectedImage: setSelectedImage,
      setValue: setValue,
      inputName: 'cover',
    })
  }
  const handleCloseModal = () => {
    setOpen ? setOpen(false) : setOpenLocal(prevState => !prevState)
  }

  const handeCheckedChange = () => {
    setIsPrivate(prevState => !prevState)
  }

  const deleteDeckCover = () => {
    setSelectedImage('')
  }

  const onSubmit = handleSubmit(data => {
    const form = new FormData()
    form.append('name', data.name)

    if (data.cover && data.cover.length > 0) {
      form.append('cover', data.cover[0])
    }

    if (!selectedImage) {
      form.append('cover', selectedImage)
    }
    form.append('isPrivate', String(isPrivate))

    if (data.name.trim() !== '' && data.name.length >= 3) {
      updateDeck({
        id: deck.id,
        form,
      })
      handleCloseModal()
    } else {
      setError('name', { message: t('error_message') })
    }
  })
  return (
    <Modal
      hover={hover}
      open={open ? open : openLocal}
      onOpenChange={setOpen ? setOpen : setOpenLocal}
      triggerName={
        <button>
          <EditIcon />
        </button>
      }
    >
      <ModalTitle title={t('edit_deck')} />
      <form onSubmit={onSubmit}>
        <div className={s.contentComponents}>
          <div className={s.imageBtnBox}>
            <ImageSelector
              selectedImage={selectedImage}
              deleteLabel={t('delete_cover')}
              onChange={handleEditFileChange}
              changeLabel={t('change_cover')}
              inputId={'input__file'}
              onImageDelete={deleteDeckCover}
            />
          </div>
          <TextField
            className={s.editTextField}
            inputId={t('name_deck')}
            label={t('name_deck')}
            placeholder={t('name_deck')}
            errorMessage={errors.name?.message}
            {...register('name', { value: deck.name })}
          />
          <CheckBox
            IconID={'checkbox-unselected'}
            SelectedIconID={'checkbox-selected'}
            checkboxId={'Private deck'}
            disabled={false}
            height={'24'}
            label={t('private_deck')}
            width={'24'}
            checked={isPrivate}
            onChange={handeCheckedChange}
          />
        </div>
        <div className={`${s.contentBtn} ${s.contentBtns}`}>
          <Button
            classNameBtnBox={s.btnBox}
            onClick={handleCloseModal}
            variant={'secondary'}
            type={'button'}
          >
            {t('cancel')}
          </Button>
          <Button
            classNameBtnBox={s.btnBox}
            onSubmit={onSubmit}
            variant={'primary'}
            disabled={!!errors.name?.message}
            type={'submit'}
          >
            {t('save_changes')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
