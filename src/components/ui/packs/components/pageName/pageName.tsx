import { ChangeEvent, FormEvent, useState } from 'react'

import { useCreateDeckMutation } from '@/api/decks/decks.api'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/ui/checkbox'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../packsPage.module.scss'
import { useAppDispatch } from '@/api/store.ts'
import { resetFilter } from '@/api/decks/pagination.reducer.ts'

export const PageName = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const [createDeck, { error, isError, reset }] = useCreateDeckMutation()

  const handleModalToggle = (isOpen: boolean = !open) => {
    setOpen(isOpen)
    if (isOpen) {
      setValue('')
      reset()
    }
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    reset()
  }

  // @ts-ignore
  const errorMessage = error?.data?.errorMessages[0].message

  const handleAddNewPackClick = (event: FormEvent) => {
    event.preventDefault()
    createDeck({ name: value })
    if (value.length < 3) {
      setOpen(true)
    } else {
      setValue('')
      setOpen(false)
      dispatch(resetFilter())
    }
  }

  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'}>
        Packs list
      </Typography>
      <Modal onOpenChange={handleModalToggle} open={open} triggerName={'Add New Pack'}>
        <ModalTitle title={'Add New Pack'} />

        <form onSubmit={handleAddNewPackClick}>
          <div className={f.contentComponents}>
            <TextField
              inputId={'Name Pack'}
              label={'Name Pack'}
              onChange={handleValueChange}
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
              label={'Private pack'}
              width={'24'}
            />
          </div>
          <div className={`${f.contentBtn} ${f.contentBtns}`}>
            <Button
              classNameBtnBox={f.btnBox}
              onClick={() => handleModalToggle(open)}
              variant={'secondary'}
              type={'button'}
            >
              Cancel
            </Button>
            <Button
              classNameBtnBox={f.btnBox}
              onClick={handleAddNewPackClick}
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
