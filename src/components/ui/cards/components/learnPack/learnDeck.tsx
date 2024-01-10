import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { showMode } from '@/api/cards'
import {
  useGetDecksByIdQuery,
  useLearnRandomCardQuery,
  useLearnRandomPostMutation,
} from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { SearchIcon } from '@/asserts/icons'
import { BackLink } from '@/components/ui/backLink'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/loader'
import { Modal, ModalClose } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

import s from './learnPack.module.scss'

import { Show } from './show'

export const LearnDeck = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { t } = useTranslation()

  const [learn, { isLoading }] = useLearnRandomPostMutation()
  const { data, isFetching } = useLearnRandomCardQuery(id!)
  const { data: deckById } = useGetDecksByIdQuery(id!)

  const show = useAppSelector(state => state.cards.show)

  const onShowAnswer = () => {
    dispatch(showMode({ show: true }))
  }

  if (isFetching || isLoading) {
    return <Progress />
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
                    <img alt={''} className={s.Image} src={data?.questionImg} />
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
                {data?.questionImg && (
                  <img alt={''} className={s.imgModal} src={data?.questionImg} />
                )}
              </div>
            </div>
          </Modal>
        </div>
        {show && (
          <Show
            answer={data?.answer}
            answerImg={data?.answerImg}
            dataId={data?.id}
            id={id}
            learn={learn}
          />
        )}
        {!show && (
          <Button autoFocus className={s.Button} onClick={onShowAnswer}>
            <Typography variant={'subtitle2'}>{t('show_answer')}</Typography>
          </Button>
        )}
      </Card>
    </>
  )
}
