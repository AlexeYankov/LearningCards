import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from './learnPack.module.scss'
import { Button } from '@/components/ui/button'
import {
  useGetDecksByIdQuery,
  useLearnRandomCardQuery,
  useLearnRandomPostMutation,
} from '@/api/decks'
import { useParams } from 'react-router-dom'
import { SearchIcon } from '@/asserts/icons'
import { Loader } from '@/components/ui/loader'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { showMode } from '@/api/cards'
import { Show } from './show'
import { Modal, ModalClose } from '@/components/ui/modal'
import { BackLink } from '@/components/ui/backLink'
import { useTranslation } from 'react-i18next'

export const LearnDeck = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { id } = useParams()
  const [learn, { isLoading }] = useLearnRandomPostMutation()
  const { data, isFetching } = useLearnRandomCardQuery(id!)
  const { data: deckById } = useGetDecksByIdQuery(id!)
  const show = useAppSelector(state => state.cards.show)
  if (isFetching) return <Loader />
  if (isLoading) return <Loader />
  const onShowAnswer = () => {
    dispatch(showMode({ show: true }))
  }
  return (
    <>
      <BackLink title={t('back_to_cards_list')} to={id!} />
      <Card>
        <Typography className={s.Title} variant={'large'}>
          {t('learn')} {deckById?.name || t('name')}
        </Typography>
        <div className={s.MainBlock}>
          <Typography variant={'subtitle1'}>
            {t('question')}:{' '}
            <Typography variant={'body1'}>{data?.question || t('question')}</Typography>
          </Typography>
          <p className={s.Text}>
            {t('number_shots_question')} {data?.shots || ''}
          </p>
          <Modal
            hover={false}
            triggerName={
              <div className={s.imgBox}>
                {data?.questionImg && (
                  <div className={s.imgAndIconInner}>
                    <SearchIcon />
                    <img className={s.Image} src={data?.questionImg} alt="" />
                  </div>
                )}
              </div>
            }
          >
            <div className={s.imgShowModal}>
              <div className={s.closeBtnBox}>
                <ModalClose />
              </div>
              <div>
                {data?.questionImg && <img className={s.imgModal} src={data?.questionImg} alt="" />}
              </div>
            </div>
          </Modal>
        </div>
        {show && (
          <Show
            id={id}
            dataId={data?.id}
            answerImg={data?.answerImg}
            answer={data?.answer}
            learn={learn}
          />
        )}
        {!show && (
          <Button autoFocus onClick={onShowAnswer} className={s.Button} fullWidth>
            <Typography variant={'subtitle2'}>{t('show_answer')}</Typography>
          </Button>
        )}
      </Card>
    </>
  )
}
