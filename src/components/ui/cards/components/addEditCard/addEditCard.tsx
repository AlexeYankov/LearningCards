import { ChangeEvent, FC, ReactNode, useState } from 'react'
import { Button } from '../../../button/button'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/textField'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import {
  CardsResponseType,
  useCreateCardMutation,
  useUpdateCardMutation,
} from '@/api/cards/cards.api.ts'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import s from './addEditCard.module.scss'
import { handleFileChange } from '@/components/ui/cards'
import { EditIcon } from '@/asserts/icons'
import { ErrorComponent } from '@/utils/toastify/Error'
import { selectedOptionSlice } from '@/api/cards'
import { ImageSelector } from '@/components/ui/imageSelector'
import { useTranslation } from 'react-i18next'

type Props = {
  id?: string
  editIcon?: ReactNode
  card?: CardsResponseType
}

const schema = z.object({
  questionImg: z.array(z.instanceof(File)),
  answerImg: z.array(z.instanceof(File)),
  answer: z.string().min(3),
  question: z.string().min(3),
})

type Form = z.infer<typeof schema>

export const AddEditCard: FC<Props> = ({ id, editIcon, card }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const [selectedQuestionImage, setSelectedQuestionImage] = useState('')
  const [selectedAnswerImage, setSelectedAnswerImage] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedEditQuestionImage, setSelectedEditQuestionImage] = useState(card?.questionImg)
  const [selectedEditAnswerImage, setSelectedEditAnswerImage] = useState(card?.answerImg)

  const valueSelect = useAppSelector(state => state.cards.valueSelect)
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>()

  const [createCard, { error, isError }] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const deleteCardQuestion = () => {
    setSelectedEditQuestionImage('')
  }

  const deleteCardAnswer = () => {
    setSelectedEditAnswerImage('')
  }

  const handleModalToggle = () => {
    setOpen(prevState => !prevState)
    reset()
    setSelectedQuestionImage('')
    setSelectedAnswerImage('')
    if (card?.answerImg || card?.questionImg) {
      dispatch(selectedOptionSlice({ valueSelect: 'Picture' }))
    } else {
      dispatch(selectedOptionSlice({ valueSelect: 'Text' }))
    }
  }

  const handleQuestionFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      setSelectedImage: editIcon ? setSelectedEditQuestionImage : setSelectedQuestionImage,
      setValue,
      event,
      inputName: 'questionImg',
    })
  }

  const handleAnswerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      setSelectedImage: editIcon ? setSelectedEditAnswerImage : setSelectedAnswerImage,
      setValue,
      event,
      inputName: 'answerImg',
    })
  }

  const onSubmit = handleSubmit(data => {
    const form = new FormData()
    form.append('question', data.question)
    form.append('answer', data.answer)

    if (data.questionImg && data.questionImg[0]) {
      form.append('questionImg', data.questionImg[0])
    }

    if (data.answerImg && data.answerImg[0]) {
      form.append('answerImg', data.answerImg[0])
    }
    if (editIcon) {
      if (!selectedEditAnswerImage) {
        form.append('answerImg', selectedEditAnswerImage!)
      }
      if (!selectedEditQuestionImage) {
        form.append('questionImg', selectedEditQuestionImage!)
      }
    }
    if (
      (data.answer.trim() !== '' && data.answer.length >= 3) ||
      (data.question.trim() !== '' && data.question.length >= 3)
    ) {
      if (editIcon) {
        updateCard({
          id: card?.id!,
          data: form,
        })
      } else {
        createCard({
          id: id!,
          data: form,
        })
      }
      handleModalToggle()
    } else {
      setError('question', { message: t('error_message') })
      setError('answer', { message: t('error_message') })
    }
  })

  return (
    <>
      <ErrorComponent error={error} isError={isError} />
      <Modal
        onOpenChange={handleModalToggle}
        open={open}
        className={s.contentComponents}
        triggerName={
          editIcon ? (
            <button>
              <EditIcon />
            </button>
          ) : (
            <Button>{t('add_new_card')}</Button>
          )
        }
      >
        {editIcon ? <ModalTitle title={'Edit Card'} /> : <ModalTitle title={t('add_new_card')} />}
        <div className={s.contentBox}>
          <div className={s.select}>
            <Select
              label={t('choose_question_format')}
              options={[t('text'), t('picture')]}
              reversed
              selectId={'Select-box'}
              isAddEditCard={true}
            />
          </div>
          <form onSubmit={onSubmit}>
            {valueSelect === 'Picture' ? (
              <>
                <TextField
                  inputId={'Input1'}
                  label={t('question')}
                  placeholder={t('question')}
                  errorMessage={errors.question?.message}
                  {...register('question', { value: card?.question })}
                />
                <ImageSelector
                  selectedImage={editIcon ? selectedEditQuestionImage : selectedQuestionImage}
                  deleteLabel={editIcon ? 'Delete Image' : ''}
                  onChange={handleQuestionFileChange}
                  changeLabel={'Change Question Image'}
                  inputId={'question-img-input'}
                  onImageDelete={deleteCardQuestion}
                />
              </>
            ) : (
              <TextField
                inputId={'Input1'}
                label={t('question')}
                placeholder={t('question')}
                errorMessage={errors.question?.message}
                {...register('question', { value: card?.question })}
              />
            )}
            {valueSelect === 'Picture' ? (
              <>
                <TextField
                  inputId={'Input2'}
                  label={t('answer')}
                  placeholder={t('answer')}
                  errorMessage={errors.answer?.message}
                  {...register('answer', { value: card?.answer })}
                />
                <ImageSelector
                  selectedImage={editIcon ? selectedEditAnswerImage : selectedAnswerImage}
                  deleteLabel={editIcon ? 'Delete Image' : ''}
                  onChange={handleAnswerFileChange}
                  changeLabel={'Change Question Image'}
                  inputId={'answer-img-input'}
                  onImageDelete={deleteCardAnswer}
                />
              </>
            ) : (
              <TextField
                inputId={'Input2'}
                label={t('answer')}
                placeholder={t('answer')}
                errorMessage={errors.answer?.message}
                {...register('answer', { value: card?.answer })}
              />
            )}
            <div className={`${s.contentBtn} ${s.contentBtns}`}>
              <Button classNameBtnBox={s.btnBox} onClick={handleModalToggle} variant={'secondary'}>
                {t('close')}
              </Button>
              <Button
                classNameBtnBox={s.btnBox}
                variant={'primary'}
                disabled={!!errors.answer?.message}
                type={'submit'}
              >
                {editIcon ? t('save_changes') : t('add_new_card')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
