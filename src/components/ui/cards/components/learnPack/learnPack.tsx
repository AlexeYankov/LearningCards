import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from './learnPack.module.scss'
import { Button } from '@/components/ui/button'
import {
  useGetDecksByIdQuery,
  useLearnRandomCardQuery,
  useLearnRandomPostMutation,
} from '@/api/decks'
import { Link, useParams } from 'react-router-dom'
import { ArrowBackIcon, SearchIcon } from '@/asserts/icons'
import { Loader } from '@/components/ui/loader'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { showMode } from '@/api/cards'
import { Show } from './show'
import { Modal, ModalClose } from '@/components/ui/modal'

export const LearnPack = () => {
  const dispatch = useAppDispatch()
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
      <div className={s.boxLink}>
        <Link className={s.backLink} to={`/${id}`}>
          <ArrowBackIcon />
          Back to Packs List
        </Link>
      </div>

      <Card>
        <Typography className={s.Title} variant={'large'}>
          Learn {deckById?.name || 'Pack Name'}
        </Typography>
        <div className={s.MainBlock}>
          <Typography variant={'subtitle1'}>
            Question: <Typography variant={'body1'}>{data?.question || 'NameQuestion'}</Typography>
          </Typography>
          <p className={s.Text}>Количество попыток ответов на вопрос: {data?.shots || ''}</p>
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
            <Typography variant={'subtitle2'}>Show Answer</Typography>
          </Button>
        )}
      </Card>
    </>
  )
}
