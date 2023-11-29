import { Link, useNavigate } from 'react-router-dom'

import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import f from '@/components/ui/packs/packsPage.module.scss'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useState } from 'react'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'
import { useDeleteDeckMutation, useUpdateDeckMutation } from '@/api/decks/decks.api'
import { Image } from '@/asserts/icons/components/Image'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

type BodyCellComponentType = {
  item: BodyCellType
  i?: boolean
  tableName?: string
  isMyDeck?: boolean
}

const schema = z.object({
  cover: z.array(z.instanceof(File)),
  name: z.string().min(3),
  isPrivate: z.boolean().default(false),
})

type Form = z.infer<typeof schema>

export const BodyCell = ({ item, i, tableName }: BodyCellComponentType) => {
  const navigate = useNavigate()

  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>()
  const [selectedImage, setSelectedImage] = useState('')
  const [openedModalIndex, setOpenedModalIndex] = useState<null | number>(null)
  const [isPrivate, setIsPrivate] = useState(false)

  const handleModalToggle = (index: number | null) => {
    if (openedModalIndex === index) {
      setOpenedModalIndex(null)
    } else {
      setOpenedModalIndex(index)
    }
  }

  const handleCloseModal = () => {
    setOpenedModalIndex(null)
    reset()
  }

  const handleDeleteDeckClick = () => {
    deleteDeck(item.id!)
    setOpenedModalIndex(null)
  }
  const handeCheckedChange = () => {
    setIsPrivate(prevState => !prevState)
  }

  const moveToLearnRandomCard = () => {
    navigate(item.id!)
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
      console.log(form)
      updateDeck({
        id: item.id!,
        form,
      })
      setOpenedModalIndex(null)
    } else {
      setError('name', { message: 'String must contain at least 3 character(s)' })
    }
  })

  return (
    <Cell className={`${tableName === 'Cards' ? s.cardsCell : s.bodyCell}`}>
      <div className={s.imageWithNameBox}>
        {item.cover && (
          <img
            className={s.image}
            src={item.cover}
            alt={item.bodyCellImageAlt || `${item.cover + ' image'}`}
          />
        )}
        {item.name && (
          <Typography variant={'body1'} className={s.typography}>
            {i ? <Link to={item.id || ''}>{item.name}</Link> : item.name}
          </Typography>
        )}
      </div>
      {item.question && (
        <Typography variant={'body1'} className={s.typography}>
          {item.question}
        </Typography>
      )}
      {item.svgs && (
        <div className={`${s.iconsBox}`}>
          {item.svgs?.map((iconSVG, i) => {
            let modalContent
            switch (i) {
              case 0:
                modalContent = (
                  <>
                    <ModalTitle title={'Learn Pack'} />
                    <ModalDescription>
                      <Typography variant={'body1'} as={'p'}>
                        Do you really want to move on to learning more about the{' '}
                        <span className={s.boldText}>{item.packName}</span>?
                      </Typography>
                    </ModalDescription>
                    <div className={`${f.contentBtn} ${f.contentBtns}`}>
                      <Button
                        classNameBtnBox={f.btnBox}
                        onClick={handleCloseModal}
                        variant={'secondary'}
                        type={'button'}
                      >
                        Cancel
                      </Button>
                      <Button
                        classNameBtnBox={f.btnBox}
                        onClick={moveToLearnRandomCard}
                        variant={'primary'}
                        type={'button'}
                      >
                        Learn Pack
                      </Button>
                    </div>
                  </>
                )
                break
              case 1:
                modalContent = (
                  <>
                    <ModalTitle title={'Edit Pack'} />
                    <form onSubmit={onSubmit}>
                      <div className={f.contentComponents}>
                        <img className={f.img} src={selectedImage} />
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
                          disabled={false}
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
                          onClick={handleCloseModal}
                          variant={'secondary'}
                          type={'button'}
                        >
                          Cancel
                        </Button>
                        <Button
                          classNameBtnBox={f.btnBox}
                          onSubmit={onSubmit}
                          variant={'primary'}
                          disabled={!!errors.name?.message}
                          type={'submit'}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </>
                )
                break
              case 2:
                modalContent = (
                  <>
                    <ModalTitle title={'Delete Pack'} />
                    <ModalDescription>
                      <Typography variant={'body1'} as={'p'}>
                        Do you really want to remove{' '}
                        <span className={s.boldText}>{item.packName}</span>?
                      </Typography>
                      <Typography variant={'body1'} as={'p'}>
                        All cards will be deleted.
                      </Typography>
                    </ModalDescription>
                    <div className={`${f.contentBtn} ${f.contentBtns}`}>
                      <Button
                        classNameBtnBox={f.btnBox}
                        onClick={handleCloseModal}
                        variant={'secondary'}
                        type={'button'}
                      >
                        Cancel
                      </Button>
                      <Button
                        classNameBtnBox={f.btnBox}
                        onClick={handleDeleteDeckClick}
                        variant={'primary'}
                        // disabled={isError}
                        type={'submit'}
                      >
                        Delete Pack
                      </Button>
                    </div>
                  </>
                )
                break
              default:
                return null
            }
            return (
              <Modal
                key={i}
                open={openedModalIndex === i}
                onOpenChange={() => handleModalToggle(i)}
                triggerName={
                  <div className={s.svgsContainer} key={i}>
                    <svg height={'16px'} viewBox={'0 0 24 24'}>
                      <use xlinkHref={`${sprite}#${iconSVG.id}`} />
                    </svg>
                  </div>
                }
              >
                {modalContent}
              </Modal>
            )
          })}
        </div>
      )}
      <div className={s.starsContainer}>
        {item.stars?.map((id, i) => {
          return (
            <div className={s.stars} key={i}>
              <svg height={'16px'} viewBox={'0 0 24 24'}>
                <use xlinkHref={`${sprite}#${id}`} />
              </svg>
            </div>
          )
        })}
      </div>
    </Cell>
  )
}
