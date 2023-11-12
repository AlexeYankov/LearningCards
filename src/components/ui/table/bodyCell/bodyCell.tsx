import { Link } from 'react-router-dom'

import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import f from '@/components/ui/packs/packsPage.module.scss'
import { Button } from '@/components/ui/button'

type BodyCellComponentType = {
  el: BodyCellType
  i?: boolean
  onClick?: () => void
  tableName?: string
  isMyDeck?: boolean
}

const BodyCell = ({ el, i, onClick, tableName }: BodyCellComponentType) => {
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
          {el.svgs?.map((el, i) => {
            const crud: any = {
              0: () => alert('is learn'),
              1: () => alert('is edit'),
              2: () => alert('is delete'),
            }

            return (
              el.id && (
                <Modal
                  // onOpenChange={handleModalToggle}
                  // open={open}
                  triggerName={
                    <div className={s.svgsContainer} key={i} onClick={crud[i + '']}>
                      <svg height={'16px'} viewBox={'0 0 24 24'}>
                        <use xlinkHref={`${sprite}#${el.id}`} />
                      </svg>
                    </div>
                  }
                >
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
                      // onClick={() => handleModalToggle(open)}
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
                </Modal>
              )
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

export default BodyCell
