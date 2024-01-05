import { ChangeEvent, FC, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { selectedOptionSlice } from '@/api/cards'
import {
  CardsResponseType,
  useCreateCardMutation,
  useUpdateCardMutation,
} from '@/api/cards/cards.api'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { EditIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { handleFileChange } from '@/components/ui/cards'
import { ImageSelector } from '@/components/ui/imageSelector'
import { Modal, ModalTitle } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/textField'
import { ErrorComponent } from '@/utils/toastify/Error'
import { z } from 'zod'

import s from './addEditCard.module.scss'

type Props = {
  card?: CardsResponseType
  editIcon?: ReactNode
  id?: string
}

const schema = z.object({
  answer: z.string().min(3),
  answerImg: z.array(z.instanceof(File)),
  question: z.string().min(3),
  questionImg: z.array(z.instanceof(File)),
})

type Form = z.infer<typeof schema>

export const AddEditCard: FC<Props> = ({ card, editIcon, id }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const [selectedQuestionImage, setSelectedQuestionImage] = useState('')
  const [selectedAnswerImage, setSelectedAnswerImage] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedEditQuestionImage, setSelectedEditQuestionImage] = useState(card?.questionImg)
  const [selectedEditAnswerImage, setSelectedEditAnswerImage] = useState(card?.answerImg)

  const valueSelect = useAppSelector(state => state.cards.valueSelect)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
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
      dispatch(selectedOptionSlice({ valueSelect: t('picture') }))
    } else {
      dispatch(selectedOptionSlice({ valueSelect: t('text') }))
    }
  }

  const handleQuestionFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event,
      inputName: 'questionImg',
      setSelectedImage: editIcon ? setSelectedEditQuestionImage : setSelectedQuestionImage,
      setValue,
    })
  }

  const handleAnswerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event,
      inputName: 'answerImg',
      setSelectedImage: editIcon ? setSelectedEditAnswerImage : setSelectedAnswerImage,
      setValue,
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
          data: form,
          id: card?.id!,
        })
      } else {
        createCard({
          data: form,
          id: id!,
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
        className={s.contentComponents}
        onOpenChange={handleModalToggle}
        open={open}
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
        {editIcon ? (
          <ModalTitle title={t('edit_card')} />
        ) : (
          <ModalTitle title={t('add_new_card')} />
        )}
        <div className={s.contentBox}>
          <div className={s.select}>
            <Select
              isAddEditCard
              options={[t('text'), t('picture')]}
              reversed
              selectId={'Select-box'}
            />
          </div>
          <form onSubmit={onSubmit}>
            {valueSelect === t('picture') ? (
              <>
                <TextField
                  errorMessage={errors.question?.message}
                  inputId={'Input1'}
                  label={t('question')}
                  placeholder={t('question')}
                  {...register('question', { value: card?.question })}
                />
                <ImageSelector
                  changeLabel={t('change_question_img')}
                  deleteLabel={editIcon ? 'Delete Image' : ''}
                  inputId={'question-img-input'}
                  onChange={handleQuestionFileChange}
                  onImageDelete={deleteCardQuestion}
                  selectedImage={editIcon ? selectedEditQuestionImage : selectedQuestionImage}
                />
              </>
            ) : (
              <TextField
                errorMessage={errors.question?.message}
                inputId={'Input1'}
                label={t('question')}
                placeholder={t('question')}
                {...register('question', { value: card?.question })}
              />
            )}
            {valueSelect === t('picture') ? (
              <>
                <TextField
                  errorMessage={errors.answer?.message}
                  inputId={'Input2'}
                  label={t('answer')}
                  placeholder={t('answer')}
                  {...register('answer', { value: card?.answer })}
                />
                <ImageSelector
                  changeLabel={t('change_answer_img')}
                  deleteLabel={editIcon ? t('delete_image') : ''}
                  inputId={'answer-img-input'}
                  onChange={handleAnswerFileChange}
                  onImageDelete={deleteCardAnswer}
                  selectedImage={editIcon ? selectedEditAnswerImage : selectedAnswerImage}
                />
              </>
            ) : (
              <TextField
                errorMessage={errors.answer?.message}
                inputId={'Input2'}
                label={t('answer')}
                placeholder={t('answer')}
                {...register('answer', { value: card?.answer })}
              />
            )}
            <div className={`${s.contentBtn} ${s.contentBtns}`}>
              <Button classNameBtnBox={s.btnBox} onClick={handleModalToggle} variant={'secondary'}>
                {t('cancel')}
              </Button>
              <Button
                classNameBtnBox={s.btnBox}
                disabled={!!errors.answer?.message}
                type={'submit'}
                variant={'primary'}
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
