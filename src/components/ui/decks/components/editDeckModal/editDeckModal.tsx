import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useUpdateDeckMutation } from '@/api/decks'
import { EditIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { handleFileChange } from '@/components/ui/cards'
import { CheckBox } from '@/components/ui/checkbox'
import { ImageSelector } from '@/components/ui/imageSelector'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { ResponseDeckType } from '@/types/decks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/ui/decks/decksPage.module.scss'

const schema = z.object({
  cover: z.any(),
  name: z.string().nonempty('Field is required').min(3).max(30),
})

type Form = z.infer<typeof schema>

type Props = {
  deck: ResponseDeckType
  hover?: boolean
  open?: boolean
  setOpen?: (open: boolean) => void
}

export const EditDeckModal = ({ deck, hover, open, setOpen }: Props) => {
  const { t } = useTranslation()

  const [updateDeck] = useUpdateDeckMutation()

  const [selectedImage, setSelectedImage] = useState(deck.cover)
  const [isPrivate, setIsPrivate] = useState(false)

  const [openLocal, setOpenLocal] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<Form>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const handleEditFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event: event,
      inputName: 'cover',
      setSelectedImage: setSelectedImage,
      setValue,
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
    const { cover, name } = data
    const form = new FormData()

    form.append('name', name)
    if (cover && cover.length > 0) {
      form.append('cover', cover[0])
    }

    if (!selectedImage) {
      form.append('cover', selectedImage)
    }
    form.append('isPrivate', String(isPrivate))

    if (name.trim() !== '' && name.length >= 3) {
      updateDeck({
        form,
        id: deck.id,
      })
        .unwrap()
        .then(() => {
          handleCloseModal()
        })
        .catch(err => {
          toast.error(err.data.errorMessages[0].message)
        })
    } else {
      setOpenLocal(true)
    }
  })

  return (
    <Modal
      hover={hover}
      onOpenChange={setOpen ? setOpen : setOpenLocal}
      open={open ? open : openLocal}
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
              changeLabel={t('change_cover')}
              deleteLabel={t('delete_cover')}
              inputId={'input__file'}
              onChange={handleEditFileChange}
              onImageDelete={deleteDeckCover}
              selectedImage={selectedImage}
            />
          </div>
          <TextField
            className={s.editTextField}
            errorMessage={errors.name?.message}
            inputId={t('name_deck')}
            label={t('name_deck')}
            placeholder={t('name_deck')}
            {...register('name', { value: deck.name.replace(/\s+/g, ' ') })}
          />
          <CheckBox
            IconID={'checkbox-unselected'}
            SelectedIconID={'checkbox-selected'}
            checkboxId={'Private deck'}
            checked={isPrivate}
            height={'24'}
            label={t('private_deck')}
            onChange={handeCheckedChange}
            width={'24'}
          />
        </div>
        <div className={`${s.contentBtn} ${s.contentBtns}`}>
          <Button
            classNameBtnBox={s.btnBox}
            onClick={handleCloseModal}
            type={'button'}
            variant={'secondary'}
          >
            {t('cancel')}
          </Button>
          <Button
            classNameBtnBox={s.btnBox}
            disabled={!!errors.name?.message}
            onSubmit={onSubmit}
            type={'submit'}
            variant={'primary'}
          >
            {t('save_changes')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
