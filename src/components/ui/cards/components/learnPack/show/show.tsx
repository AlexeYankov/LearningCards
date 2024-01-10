import { useTranslation } from 'react-i18next'

import { changeGradeValueLearn, changeValueLearn, showMode } from '@/api/cards'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { SearchIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { Modal, ModalClose } from '@/components/ui/modal'
import { Radio } from '@/components/ui/radio-group'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/cards/components/learnPack/learnPack.module.scss'

type Props = {
  answer?: string
  answerImg?: string
  dataId?: string
  id?: string
  learn?: any
}
export const Show = ({ answer, answerImg, dataId, id, learn }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const options = [
    { value: t('did_not_know') },
    { value: t('forgot') },
    { value: t('a_lot_of_thought') },
    { value: t('confused') },
    { value: t('knew_answer') },
  ]

  const valueLearn = useAppSelector(state => state.cards.valueLearn)
  const valueGradeLearn = useAppSelector(state => state.cards.valueGradeLearn)

  const onChangeValue = (value: string) => {
    dispatch(changeValueLearn({ valueLearn: value }))
    const index = options.findIndex(el => el.value === value) + 1

    dispatch(changeGradeValueLearn({ valueGradeLearn: index }))
  }
  const sendHandler = () => {
    learn({ cardId: dataId, grade: valueGradeLearn, id })
      .unwrap()
      .then(() => {
        dispatch(showMode({ show: false }))
        dispatch(changeValueLearn({ valueLearn: options[0].value }))
      })
  }

  return (
    <>
      <div className={s.MainBlock}>
        <p className={s.Answer}>
          {t('answer')}: <Typography variant={'body1'}>{answer || ''}</Typography>
        </p>
        <Modal
          hover={false}
          triggerName={
            <div className={s.imgBox}>
              {answerImg && (
                <div className={s.imgAndIconInner}>
                  <SearchIcon />
                  <img alt={''} className={s.Image} src={answerImg} />
                </div>
              )}
            </div>
          }
        >
          <div className={s.imgShowModal}>
            <div className={s.closeBtnBox}>
              <ModalClose />
            </div>
            <div>{answerImg && <img alt={''} className={s.imgModal} src={answerImg} />}</div>
          </div>
        </Modal>
        <p className={s.Rate}>{t('rate_yourself')}:</p>
        <Radio
          className={s.Radio}
          onChange={e => onChangeValue(e)}
          options={options}
          value={valueLearn}
        />
      </div>
      <Button autoFocus className={s.Button} onClick={sendHandler}>
        <Typography variant={'subtitle2'}>{t('next_question')}</Typography>
      </Button>
    </>
  )
}
