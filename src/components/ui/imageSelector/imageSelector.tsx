import s from './imageSelector.module.scss'
import { Button } from '@/components/ui/button'
import { DeleteIcon, ImageIcon } from '@/asserts/icons'
import { ChangeEvent } from 'react'

type Props = {
  label?: string
  selectedImage?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onImageDelete?: () => void
  inputId?: string
  changeLabel?: string
  deleteLabel?: string
}
export const ImageSelector = ({
  selectedImage,
  onChange,
  onImageDelete,
  inputId,
  changeLabel,
  deleteLabel,
}: Props) => {
  return (
    <>
      <img alt={''} className={s.img} src={selectedImage} />
      <div className={s.btnCoverBox}>
        {deleteLabel
          ? selectedImage && (
              <Button variant={'secondary'} className={s.changeCover} onClick={onImageDelete}>
                <DeleteIcon />
                {deleteLabel}
              </Button>
            )
          : ''}
        {}
        <label htmlFor={inputId} className={s.changeCover}>
          <ImageIcon />
          {changeLabel}
        </label>
      </div>
      <input className={s.inputFile} id={inputId} type="file" onChange={onChange} />
    </>
  )
}
