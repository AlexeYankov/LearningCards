import s from '@/components/ui/cards/components/learnPack/learnPack.module.scss'
import { Typography } from '@/components/ui/typography'
import { Radio } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { changeGradeValueLearn, changeValueLearn, showMode } from '@/api/cards'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { SearchIcon } from '@/asserts/icons'
import { Modal, ModalClose } from '@/components/ui/modal'
import { useTranslation } from 'react-i18next'

type Props = {
  id?: string
  dataId?: string
  answer?: string
  answerImg?: string
  learn?: any
}
export const Show = ({ dataId, id, answerImg, answer, learn }: Props) => {
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
    let index = options.findIndex(el => el.value === value) + 1
    dispatch(changeGradeValueLearn({ valueGradeLearn: index }))
  }
  const sendHandler = () => {
    learn({ id, grade: valueGradeLearn, cardId: dataId })
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
                  <img className={s.Image} src={answerImg} alt="" />
                </div>
              )}
            </div>
          }
        >
          <div className={s.imgShowModal}>
            <div className={s.closeBtnBox}>
              <ModalClose />
            </div>
            <div>{answerImg && <img className={s.imgModal} src={answerImg} alt="" />}</div>
          </div>
        </Modal>
        <p className={s.Rate}>{t('rate_yourself')}:</p>
        <Radio
          value={valueLearn}
          onChange={e => onChangeValue(e)}
          className={s.Radio}
          options={options}
        />
      </div>
      <Button autoFocus onClick={sendHandler} className={s.Button} fullWidth>
        <Typography variant={'subtitle2'}>{t('next_question')}</Typography>
      </Button>
    </>
  )
}
