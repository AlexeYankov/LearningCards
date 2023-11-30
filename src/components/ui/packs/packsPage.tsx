import {
  ResponseDeckType,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/api/decks/decks.api'

import s from './packsPage.module.scss'

import { Pagination } from '../pagination'
import { PageBar } from './components/pageBar/pageBar'
import { PageName } from './components/pageName/pageName'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { ChangeEvent, useEffect, useState } from 'react'
import { changeCurrentPage } from '@/api/decks/pagination.reducer'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'
import { Column } from '@/components/ui/table/types.ts'
import { Typography } from '@/components/ui/typography'
import { Link } from 'react-router-dom'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import f from '@/components/ui/packs/packsPage.module.scss'
import { Button } from '@/components/ui/button'
import { Image } from '@/asserts/icons/components/Image.tsx'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Edit } from '@/asserts/icons/components/Edit'
import { Learn } from '@/asserts/icons/components/Learn.tsx'
import { Delete } from '@/asserts/icons/components/Delete.tsx'
import { convertedTime } from '@/helpers/convertedTime.ts'

export const PacksPage = () => {
  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)
  const authorId = useAppSelector(state => state.pagination.authorId)
  const name = useAppSelector(state => state.pagination.name)
  const orderBy = useAppSelector(state => state.pagination.orderBy)

  const { data: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    authorId,
    name,
    orderBy,
  })
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
    },
  ]

  return (
    <div className={s.container}>
      <PageName />
      <PageBar />
      <Root className={s.container__common}>
        <Head className={s.tableHead}>
          {/*<Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>*/}
          <Row className={s.decksRow}>
            {columns.map(({ title, key }) => {
              return (
                <HeadCell className={s.headCell} key={key}>
                  {/*<HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>*/}
                  {title}
                  {/*{sort?.key === key ? <ArrowUp /> : ''}*/}
                </HeadCell>
              )
            })}
          </Row>
        </Head>
        <Body>
          {decks?.items?.map(deck => {
            return (
              <Row className={s.decksRow} key={deck.id}>
                <Cell className={s.bodyCell}>
                  <div className={s.imageWithNameBox}>
                    {deck.cover && (
                      <img className={s.image} src={deck.cover} alt={`${deck.cover + ' image'}`} />
                    )}
                    {deck.name && (
                      <Typography variant={'body1'} className={s.typography}>
                        {'1' ? <Link to={deck.id || ''}>{deck.name}</Link> : deck.name}
                      </Typography>
                    )}
                  </div>
                </Cell>
                <Cell className={s.bodyCell}>{deck.cardsCount}</Cell>
                <Cell className={s.bodyCell}>{convertedTime(deck.updated)}</Cell>
                <Cell className={s.bodyCell}>{deck.author.name}</Cell>
                <Cell className={`${s.bodyCell} ${s.iconBox}`}>
                  <LearnCardModal deck={deck} />
                  <EditCardModal deckId={deck.id} />
                  <DeleteCardModal deck={deck} />
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

const EditCardModal = ({ deckId }: { deckId: string }) => {
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

  const onSubmit = handleSubmit(data => {
    const form = new FormData()
    if (data.cover && data.cover.length > 0) {
      form.append('cover', data.cover[0])
    }
    form.append('name', data.name)
    form.append('isPrivate', String(isPrivate))

    if (data.name.trim() !== '' && data.name.length >= 3) {
      updateDeck({
        id: deckId,
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
          <Edit />
        </button>
      }
    >
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
    </Modal>
  )
}

const LearnCardModal = ({ deck }: { deck: ResponseDeckType }) => {
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerName={
        <button>
          <Learn />
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
      <div className={`${f.contentBtn} ${f.contentBtns}`}>
        <Button
          classNameBtnBox={f.btnBox}
          onClick={handleCloseModal}
          variant={'secondary'}
          type={'button'}
        >
          Cancel
        </Button>
        <Button classNameBtnBox={f.btnBox} variant={'primary'} type={'button'}>
          Learn Pack
        </Button>
      </div>
    </Modal>
  )
}

const DeleteCardModal = ({ deck }: { deck: ResponseDeckType }) => {
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
          <Delete />
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
    </Modal>
  )
}
