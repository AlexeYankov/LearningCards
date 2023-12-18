import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/asserts/icons/components/DeleteIcon.tsx'
import { ImageIcon } from '@/asserts/icons/components/ImageIcon.tsx'
import s from './addEditCard.module.scss'

type Props = {
  label?: any
  selectedImage?: any
  onChange?: any
  onImageDelete?: any
  inputId?: any
  changeLabel?: any
  deleteLabel?: any
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
