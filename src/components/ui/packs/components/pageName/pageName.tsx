import { ChangeEvent, useState } from 'react'

import { useCreateDeckMutation } from '@/api/decks/decks.api'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/ui/checkbox'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../packsPage.module.scss'
import { useAppDispatch } from '@/api/store.ts'
import {
  changeCurrentPage,
  changeMaxCardsCount,
  changeMinCardsCount,
} from '@/api/decks/pagination.reducer.ts'

export const PageName = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const [createDeck, { error, isError, reset }] = useCreateDeckMutation()

  const handleCloseModal = (isOpen: boolean) => {
    setOpen(isOpen)
    setValue('')
    reset()
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    reset()
  }

  // @ts-ignore
  const errorMessage = error?.data?.errorMessages[0].message

  const handleAddNewPackClick = () => {
    createDeck({ name: value })
    if (value.length < 3) {
      setOpen(true)
    } else {
      setValue('')
      setOpen(false)
      dispatch(changeCurrentPage({ currentPage: 1 }))
      dispatch(changeMinCardsCount({ minCardsCount: 0 }))
      dispatch(changeMaxCardsCount({ maxCardsCount: 61 }))
    }
  }

  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'}>
        Packs list
      </Typography>
      <Modal onOpenChange={handleCloseModal} open={open} triggerName={'Add New Pack'}>
        <ModalTitle title={'Add New Pack'} />
        <div className={f.contentComponents}>
          <TextField
            inputId={'Name Pack'}
            label={'Name Pack'}
            onChange={handleValueChange}
            onEnter={handleAddNewPackClick}
            placeholder={'Name'}
            value={value}
            errorMessage={errorMessage}
          />
          <CheckBox
            IconID={'checkbox-unselected'}
            SelectedIconID={'checkbox-selected'}
            checkboxId={'Private Pack'}
            disabled={false}
            height={'24'}
            label={'Private Pack'}
            width={'24'}
          />
        </div>
        <div className={`${f.contentBtn} ${f.contentBtns}`}>
          <Button
            classNameBtnBox={f.btnBox}
            onClick={() => handleCloseModal(!open)}
            variant={'secondary'}
          >
            Cancel
          </Button>
          <Button
            classNameBtnBox={f.btnBox}
            onClick={handleAddNewPackClick}
            variant={'primary'}
            disabled={isError}
          >
            Add New Pack
          </Button>
        </div>
      </Modal>
    </div>
  )
}
