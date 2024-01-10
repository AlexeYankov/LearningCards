import { ChangeEvent } from 'react'

import { DeleteIcon, ImageIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'

import s from './imageSelector.module.scss'

type Props = {
  changeLabel?: string
  deleteLabel?: string
  inputId?: string
  label?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onImageDelete?: () => void
  selectedImage?: string
}
export const ImageSelector = ({
  changeLabel,
  deleteLabel,
  inputId,
  onChange,
  onImageDelete,
  selectedImage,
}: Props) => {
  return (
    <>
      <img alt={''} className={s.img} src={selectedImage} />
      <div className={s.btnCoverBox}>
        {deleteLabel
          ? selectedImage && (
              <Button className={s.changeCover} onClick={onImageDelete} variant={'secondary'}>
                <DeleteIcon />
                {deleteLabel}
              </Button>
            )
          : ''}
        {}
        <label className={s.changeCover} htmlFor={inputId}>
          <ImageIcon />
          {changeLabel}
        </label>
      </div>
      <input className={s.inputFile} id={inputId} onChange={onChange} type={'file'} />
    </>
  )
}
