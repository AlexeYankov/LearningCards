import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import f from '../../packsPage.module.scss'
import { Modal, ModalTitle } from '@/components/ui/modal'
import s from '@/components/ui/modal/modal.module.scss'
import img from '@/asserts/Mask.png'
import { Image } from '@/asserts/icons/components/Image'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'
import { ChangeEvent, useState } from 'react'
import { useCreateDeckMutation } from '@/api/decks/decks.api'

export const PageName = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const [createDeck] = useCreateDeckMutation()

  const handleCloseModal = () => setOpen(false)

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleAddNewPackClick = () => {
    if (value.trim() !== '') {
      createDeck({ name: value })
      setValue('')
      setOpen(false)
    }
  }

  return (
    <div className={f.container__pageName}>
      <Typography as="h1" variant="large">
        Packs list
      </Typography>
      <Modal open={open} onOpenChange={setOpen} triggerName={'Add New Pack'}>
        <ModalTitle title={'Add New Pack'} />
        <div className={s.contentComponents}>
          <img alt={'card image'} className={s.img} src={img} />
          <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
            Change Cover
          </Button>
          <TextField
            inputId={'Name Pack'}
            label={'Name Pack'}
            placeholder={'Name'}
            value={value}
            onChange={handleValueChange}
            onEnter={handleAddNewPackClick}
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
          <Button classNameBtnBox={s.btnBox} variant={'secondary'} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button classNameBtnBox={s.btnBox} variant={'primary'} onClick={handleAddNewPackClick}>
            Add New Pack
          </Button>
        </div>
      </Modal>
    </div>
  )
}

// type Props = {
//   open: boolean
//   setOpen: (open: boolean) => void
//   trigger: ReactNode
// }

// const AddNewPackModal: FC<Props> = ({ open, setOpen, trigger }) => {
//   console.log(open)
//   console.log(trigger)
//
//   return (
//     <Modal open={open} onOpenChange={() => setOpen(true)} trigger={trigger}>
//       <ModalTitle title={'Add New Pack'} />
//       <div className={s.contentComponents}>
//         <img alt={'card image'} className={s.img} src={img} />
//         <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
//           Change Cover
//         </Button>
//         <TextField inputId={'Name Pack'} label={'Name Pack'} placeholder={'Name'} />
//         <CheckBox
//           IconID={'checkbox-unselected'}
//           SelectedIconID={'checkbox-selected'}
//           checkboxId={'Private Pack'}
//           disabled={false}
//           height={'24'}
//           label={'Private Pack'}
//           width={'24'}
//         />
//       </div>
//       <div className={`${s.contentBtn} ${s.contentBtns}`}>
//         <Button classNameBtnBox={s.btnBox} variant={'secondary'}>
//           Cancel
//         </Button>
//         <Button classNameBtnBox={s.btnBox} variant={'primary'}>
//           Add New Pack
//         </Button>
//       </div>
//     </Modal>
//   )
// }
