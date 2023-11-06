import { ChangeEvent, FC, useEffect, useState } from 'react'

import { useCreateDeckMutation } from '@/api/decks/decks.api'
import img from '@/asserts/Mask.png'
import { Image } from '@/asserts/icons/components/Image'
import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/ui/checkbox'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../packsPage.module.scss'
import s from '@/components/ui/modal/modal.module.scss'
import { useAppDispatch } from '@/api/store.ts'
import { changeCurrentPage } from '@/api/decks/pagination.reducer.ts'
import { PaginationResponseType } from '@/api/common.api.ts'

type PageNameProps = {
  handlePaginationChange?: (newValues: Partial<PaginationResponseType>) => void
}

export const PageName: FC<PageNameProps> = ({ handlePaginationChange }) => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const [createDeck, { data }] = useCreateDeckMutation()

  const handleCloseModal = () => setOpen(false)

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleAddNewPackClick = () => {
    if (value.trim() !== '') {
      createDeck({ name: value })
      dispatch(changeCurrentPage({ currentPage: 1 }))
      setValue('')
      setOpen(false)
    }
  }

  useEffect(() => {
    handlePaginationChange && handlePaginationChange({ currentPage: 1 })
  }, [data])

  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'}>
        Packs list
      </Typography>
      <Modal onOpenChange={setOpen} open={open} triggerName={'Add New Pack'}>
        <ModalTitle title={'Add New Pack'} />
        <div className={s.contentComponents}>
          <img alt={'card image'} className={s.img} src={img} />
          <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
            Change Cover
          </Button>
          <TextField
            inputId={'Name Pack'}
            label={'Name Pack'}
            onChange={handleValueChange}
            onEnter={handleAddNewPackClick}
            placeholder={'Name'}
            value={value}
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
        <div className={`${s.contentBtn} ${s.contentBtns}`}>
          <Button classNameBtnBox={s.btnBox} onClick={handleCloseModal} variant={'secondary'}>
            Cancel
          </Button>
          <Button classNameBtnBox={s.btnBox} onClick={handleAddNewPackClick} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </Modal>
    </div>
  )
}
