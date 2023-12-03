import {
  ResponseDeckType,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/api/decks/decks.api'

import s from './decksPage.module.scss'

import { Pagination } from '../pagination'
import { DecksPageBar } from './components/decksPageBar/decksPageBar'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { ChangeEvent, useEffect, useState } from 'react'
import { changeCurrentPage, changeOrderBy } from '@/api/decks/pagination.reducer'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'
import { Column, Sort } from '@/components/ui/table/types.ts'
import { Typography } from '@/components/ui/typography'
import { Link } from 'react-router-dom'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { ImageIcon } from '@/asserts/icons/components/ImageIcon.tsx'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EditIcon } from '@/asserts/icons/components/EditIcon.tsx'
import { LearnIcon } from '@/asserts/icons/components/LearnIcon.tsx'
import { convertedTime } from '@/helpers/convertedTime.ts'
import { useMeQuery } from '@/api/auth-api/auth.api.ts'
import { DecksPageName } from '@/components/ui/decks/components/decksPageName/decksPageName.tsx'
import { DeleteIcon } from '@/asserts/icons/components/DeleteIcon.tsx'

export const DecksPage = () => {
  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)
  const sort = useAppSelector(state => state.pagination.sort)
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)
  const authorId = useAppSelector(state => state.pagination.authorId)
  const name = useAppSelector(state => state.pagination.name)

  const { data: me } = useMeQuery()
  const { data: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    authorId,
    name,
    orderBy: sort?.direction as Sort,
  })

  const handleSort = (key: string) => {
    if (key !== 'actions') {
      dispatch(
        changeOrderBy({
          key,
          direction: sort?.direction === `${key}-asc` ? `${key}-desc` : `${key}-asc`,
        })
      )
    }
    if (sort?.direction === `${key}-desc`) {
      dispatch(
        changeOrderBy({
          key,
          direction: null,
        })
      )
    }
  }

  useEffect(() => {
    const savedCurrentPage = localStorage.getItem('page')
    dispatch(changeCurrentPage({ currentPage: parseInt(savedCurrentPage!, 10) || 1 }))
  }, [])

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'author.name',
      title: 'Created by',
      sortable: true,
    },
    {
      key: 'actions',
      title: '',
      sortable: false,
    },
  ]

  return (
    <div className={s.container}>
      <DecksPageName />
      <DecksPageBar />
      <Root className={s.container__common}>
        <Head className={s.tableHead}>
          <Row className={s.decksRow}>
            {columns.map(({ title, key, sortable }) => {
              return (
                <HeadCell className={s.headCell} key={key} onClick={() => handleSort(key)}>
                  {title}
                  {sort && sort.key === key && sortable && sort.direction && (
                    <button className={s.sortIcon}>
                      {sort.direction === `${key}-desc` ? '▲' : '▼'}
                    </button>
                  )}
                </HeadCell>
              )
            })}
          </Row>
        </Head>
        <Body>
          {decks?.items?.map(deck => {
            const isMyDeck = me?.id === deck.author.id
            return (
              <Row className={s.decksRow} key={deck.id}>
                <Cell className={s.bodyCell}>
                  <Link to={deck.id || ''} className={s.deckNameWithImgBox}>
                    {deck.cover && (
                      <img className={s.image} src={deck.cover} alt={`${deck.cover + ' image'}`} />
                    )}
                    {deck.name && (
                      <Typography variant={'body1'} className={s.deckName}>
                        {deck.name}
                      </Typography>
                    )}
                  </Link>
                </Cell>
                <Cell className={s.bodyCell}>{deck.cardsCount}</Cell>
                <Cell className={s.bodyCell}>{convertedTime(deck.updated)}</Cell>
                <Cell className={s.bodyCell}>{deck.author.name}</Cell>
                <Cell className={`${s.bodyCell}`}>
                  <div className={s.iconsBox}>
                    {isMyDeck ? (
                      <>
                        <EditDeckModal deck={deck} />
                        <LearnDeckModal deck={deck} isMyDeck={isMyDeck} />
                        <DeleteDeckModal deck={deck} />
                      </>
                    ) : (
                      <LearnDeckModal deck={deck} isMyDeck={isMyDeck} />
                    )}
                  </div>
                </Cell>
              </Row>
            )
          })}
        </Body>
      </Root>

      <Pagination
        reversed
        arrowColor={'white'}
        arrowID={'arrow-ios-back'}
        reversedArrowID={'arrow-ios-forward'}
        totalPages={decks?.pagination?.totalPages}
        totalItems={decks?.pagination?.totalItems}
      />
    </div>
  )
}

const schema = z.object({
  cover: z.array(z.instanceof(File)),
  name: z.string().min(3),
  isPrivate: z.boolean().default(false),
})

type Form = z.infer<typeof schema>

const EditDeckModal = ({ deck }: { deck: ResponseDeckType }) => {
  const [updateDeck] = useUpdateDeckMutation()
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>()
  const [selectedImage, setSelectedImage] = useState(deck.cover)
  const [isPrivate, setIsPrivate] = useState(false)
  const [open, setOpen] = useState(false)
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

  const handleCloseModal = () => {
    reset()
    setOpen(false)
  }

  const handeCheckedChange = () => {
    setIsPrivate(prevState => !prevState)
  }

  const deleteDeckCover = () => {
    setSelectedImage('')
  }

  const onSubmit = handleSubmit(data => {
    const form = new FormData()

    if (data.cover && data.cover.length > 0) {
      form.append('cover', data.cover[0])
    }

    if (!selectedImage) {
      form.append('cover', selectedImage)
    }
    form.append('name', data.name)
    form.append('isPrivate', String(isPrivate))

    if (data.name.trim() !== '' && data.name.length >= 3) {
      updateDeck({
        id: deck.id,
        form,
      })
      handleCloseModal()
    } else {
      setError('name', { message: 'String must contain at least 3 character(s)' })
    }
  })
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerName={
        <button>
          <EditIcon />
        </button>
      }
    >
      <ModalTitle title={'Edit Pack'} />
      <form onSubmit={onSubmit}>
        <div className={s.contentComponents}>
          <img className={s.img} src={selectedImage} />
          <div className={s.btnCoverBox}>
            {selectedImage && (
              <Button variant={'secondary'} className={s.changeCover} onClick={deleteDeckCover}>
                <DeleteIcon />
                Delete Cover
              </Button>
            )}
            <label htmlFor="input__file" className={s.changeCover}>
              <ImageIcon />
              Change Cover
            </label>
          </div>
          <input
            className={s.inputFile}
            id={'input__file'}
            type="file"
            onChange={handleFileChange}
          />
          <TextField
            inputId={'Name Pack'}
            label={'Name Pack'}
            placeholder={'Name'}
            errorMessage={errors.name?.message}
            value={deck.name}
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
        <div className={`${s.contentBtn} ${s.contentBtns}`}>
          <Button
            classNameBtnBox={s.btnBox}
            onClick={handleCloseModal}
            variant={'secondary'}
            type={'button'}
          >
            Cancel
          </Button>
          <Button
            classNameBtnBox={s.btnBox}
            onSubmit={onSubmit}
            variant={'primary'}
            disabled={!!errors.name?.message}
            type={'submit'}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

const LearnDeckModal = ({ deck, isMyDeck }: { deck: ResponseDeckType; isMyDeck: boolean }) => {
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => {
    setOpen(prevState => !prevState)
  }

  const emptyCardsInDeck = deck.cardsCount === 0

  const isBtnDisabled = emptyCardsInDeck || (isMyDeck && emptyCardsInDeck)

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      disabled={isBtnDisabled}
      triggerName={
        <button className={isBtnDisabled ? s.disabledIcon : ''}>
          <LearnIcon />
        </button>
      }
    >
      <ModalTitle title={'Learn Pack'} />
      <ModalDescription>
        <Typography variant={'body1'} as={'p'}>
          Do you really want to move on to learning more about the{' '}
          <span className={s.boldText}>{deck.name}</span>?
        </Typography>
      </ModalDescription>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button
          classNameBtnBox={s.btnBox}
          onClick={handleCloseModal}
          variant={'secondary'}
          type={'button'}
        >
          Cancel
        </Button>
        <Button classNameBtnBox={s.btnBox} variant={'primary'} type={'button'}>
          Learn Pack
        </Button>
      </div>
    </Modal>
  )
}

const DeleteDeckModal = ({ deck }: { deck: ResponseDeckType }) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => {
    setOpen(prevState => !prevState)
  }

  const handleDeleteDeckClick = () => {
    deleteDeck(deck.id!)
    handleCloseModal()
  }
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerName={
        <button>
          <DeleteIcon />
        </button>
      }
    >
      <ModalTitle title={'Delete Pack'} />
      <ModalDescription>
        <Typography variant={'body1'} as={'p'}>
          Do you really want to remove <span className={s.boldText}>{deck.name}</span>?
        </Typography>
        <Typography variant={'body1'} as={'p'}>
          All cards will be deleted.
        </Typography>
      </ModalDescription>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button
          classNameBtnBox={s.btnBox}
          onClick={handleCloseModal}
          variant={'secondary'}
          type={'button'}
        >
          Cancel
        </Button>
        <Button
          classNameBtnBox={s.btnBox}
          onClick={handleDeleteDeckClick}
          variant={'primary'}
          // disabled={isError}
          type={'submit'}
        >
          Delete Pack
        </Button>
      </div>
    </Modal>
  )
}
