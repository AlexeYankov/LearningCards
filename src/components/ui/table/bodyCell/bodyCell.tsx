import { Link, useNavigate } from 'react-router-dom'

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
import { useDeleteDeckMutation } from '@/api/decks/decks.api'

type BodyCellComponentType = {
  item: BodyCellType
  i?: boolean
  tableName?: string
  isMyDeck?: boolean
}

export const BodyCell = ({ item, i, tableName }: BodyCellComponentType) => {
  const navigate = useNavigate()

  const [deleteDeck] = useDeleteDeckMutation()

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

  const handleDeleteDeckClick = () => {
    deleteDeck(item.id!)
    setOpenedModalIndex(null)
  }

  const moveToLearnRandomCard = () => {
    navigate(item.id!)
  }

  return (
    <Cell className={`${tableName === 'Cards' ? s.cardsCell : s.bodyCell}`}>
      <div className={s.imageWithNameBox}>
        {item.cover && (
          <img
            className={s.image}
            src={item.cover}
            alt={item.bodyCellImageAlt || `${item.cover + ' image'}`}
          />
        )}
        {item.name && (
          <Typography variant={'body1'} className={s.typography}>
            {i ? <Link to={item.id || ''}>{item.name}</Link> : item.name}
          </Typography>
        )}
      </div>
      {item.question && (
        <Typography variant={'body1'} className={s.typography}>
          {item.question}
        </Typography>
      )}
      {item.svgs && (
        <div className={`${s.iconsBox}`}>
          {item.svgs?.map((iconSVG, i) => {
            let modalContent
            switch (i) {
              case 0:
                modalContent = (
                  <>
                    <ModalTitle title={'Learn Pack'} />
                    <ModalDescription>
                      <Typography variant={'body1'} as={'p'}>
                        Do you really want to move on to learning more about the{' '}
                        <span className={s.boldText}>{item.packName}</span>?
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
                        onClick={moveToLearnRandomCard}
                        variant={'primary'}
                        type={'button'}
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
                        Do you really want to remove{' '}
                        <span className={s.boldText}>{item.packName}</span>?
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
                  </>
                )
                break
              default:
                return null
            }
            return (
              <Modal
                key={i}
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
        {item.stars?.map((id, i) => {
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
