import { Link } from 'react-router-dom'

import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import f from '@/components/ui/packs/packsPage.module.scss'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'

type BodyCellComponentType = {
  el: BodyCellType
  i?: boolean
  onClick?: () => void
  tableName?: string
  isMyDeck?: boolean
}

export const BodyCell = ({ el, i, onClick, tableName }: BodyCellComponentType) => {
  const [openedModalIndex, setOpenedModalIndex] = useState<null | number>(null)

  const handleModalToggle = (index: number | null) => {
    if (openedModalIndex === index) {
      setOpenedModalIndex(null)
    } else {
      setOpenedModalIndex(index)
    }
  }

  const handleCloseModal = () => {
    setOpenedModalIndex(null)
  }

  return (
    <Cell className={`${tableName === 'Cards' ? s.cardsCell : s.bodyCell}`}>
      {el.cover && (
        <Typography
          alt={el.bodyCellImageAlt || `${el.cover + ' image'}`}
          as={'img'}
          src={el.cover}
          className={s.typography}
        />
      )}

      {el.name && (
        <Typography onClick={onClick} variant={'body1'} className={s.typography}>
          {i ? <Link to={el.id || ''}>{el.name}</Link> : el.name}
        </Typography>
      )}
      {el.question && (
        <Typography onClick={onClick} variant={'body1'} className={s.typography}>
          {el.question}
        </Typography>
      )}
      {el.svgs && (
        <div className={`${s.iconsBox}`}>
          {el.svgs?.map((iconSVG, i) => {
            let modalContent
            switch (i) {
              case 0:
                modalContent = (
                  <>
                    <ModalTitle title={'Learn Pack'} />
                    <ModalDescription>
                      <Typography variant={'body1'} as={'p'}>
                        Do you really want to move on to learning more about the pack?
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
                        // onClick={handleAddNewPackClick}
                        variant={'primary'}
                        // disabled={isError}
                        type={'submit'}
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
                    <form>
                      {/*onSubmit={handleAddNewPackClick}*/}
                      <div className={f.contentComponents}>
                        <TextField
                          inputId={'Name Pack'}
                          label={'Name Pack'}
                          // onChange={handleValueChange}
                          placeholder={'Name'}
                          // value={value}
                          // errorMessage={errorMessage}
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
                          onClick={handleCloseModal}
                          variant={'secondary'}
                          type={'button'}
                        >
                          Cancel
                        </Button>
                        <Button
                          classNameBtnBox={f.btnBox}
                          // onClick={handleAddNewPackClick}
                          variant={'primary'}
                          // disabled={isError}
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
                        Do you really want to remove Pack Name?
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
                        // onClick={handleAddNewPackClick}
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
                key={el.id}
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
        {el.stars?.map((id, i) => {
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
