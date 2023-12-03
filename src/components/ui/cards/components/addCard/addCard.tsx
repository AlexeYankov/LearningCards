import {ChangeEvent, FC, useState} from 'react'
import {Button} from '../../../button/button.tsx'
import {Select} from '@/components/ui/select'
import {TextField} from '@/components/ui/textField'
import {Modal, ModalTitle} from '@/components/ui/modal'
import {useAppSelector} from '@/api/store.ts'
import {useCreateCardMutation} from '@/api/common.api.ts'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
// import f from '@/components/ui/packs/packsPage.module.scss'
import {Image} from '@/asserts/icons/components/Image.tsx'
import f from './addCard.module.scss'

type Props = {
  id: string | undefined
}

const schema = z.object({
  questionImg: z.array(z.instanceof(File)),
  answerImg: z.array(z.instanceof(File)),
  answer: z.string().min(3),
  question: z.string().min(3),
})

type Form = z.infer<typeof schema>

export const AddCard: FC<Props> = ({ id }) => {
  const [selectedQuestionImage, setSelectedQuestionImage] = useState('');
  const [selectedAnswerImage, setSelectedAnswerImage] = useState('');
  const [open, setOpen] = useState(false)
  // const [isPrivate, setIsPrivate] = useState(false)
  const valueSelect = useAppSelector(state => state.cards.valueSelect)

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>()

  const [createCard] = useCreateCardMutation()

  const handleModalToggle = () => {
    setOpen(prevState => !prevState)
    reset()
    setSelectedQuestionImage('')
    setSelectedAnswerImage('')
  }

  const handleQuestionFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedQuestionImage(imageUrl);
      setValue('questionImg', [file]);
    } else {
      setSelectedQuestionImage('');
      setValue('questionImg', []);
    }
  };

  const handleAnswerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedAnswerImage(imageUrl);
      setValue('answerImg', [file]);
    } else {
      setSelectedAnswerImage('');
      setValue('answerImg', []);
    }
  };


  const onSubmit = handleSubmit(data => {
    const form = new FormData()
    if (data.questionImg && data.questionImg.length > 0) {
      form.append('questionImg', data.questionImg[0])
      form.append('answerImg', data.questionImg[0])
    }
    form.append('question', data.question)
    form.append('answer', data.answer)
    if (
      (data.answer.trim() !== '' && data.answer.length >= 3) ||
      (data.question.trim() !== '' && data.question.length >= 3)
    ) {
      createCard({ id: id!, data: form })
      handleModalToggle()

    } else {
      setError('question', { message: 'String must contain at least 3 character(s)' })
      setError('answer', { message: 'String must contain at least 3 character(s)' })
    }
  })

  return (
    <div className={f.container__pageName}>
      <Modal
          onOpenChange={handleModalToggle}
          open={open}
          className={f.contentComponents}
          triggerName={
        <Button>
          Add new card
        </Button>}>
        <ModalTitle title={'Add New Card'} />
        <Select
          classname={f.select}
          label={'Choose question format'}
          options={['Text', 'Picture']}
          reversed
          selectId={'Select-box'}
        />
        <form onSubmit={onSubmit}>
          {valueSelect === 'Picture' ? (
              <div className={f.contentComponents}>
                <img className={f.img} src={selectedQuestionImage || ''} />
                <label htmlFor="question-img-input" className={f.changeCover}>
                  <Image />
                  Change Question Image
                </label>
                <input
                    className={f.inputFile}
                    id="question-img-input"
                    type="file"
                    onChange={handleQuestionFileChange}
                />
              </div>
          ) : (
              <div className={f.contentComponents}>
                <TextField
                    inputId={'Input1'}
                    label={'Question'}
                    placeholder={'Question'}
                    errorMessage={errors.question?.message}
                    {...register('question')}
                />
              </div>
          )}
          {valueSelect === 'Picture' ? (
              <div className={f.contentComponents}>
                <img className={f.img} src={selectedAnswerImage || ''} />
                <label htmlFor="answer-img-input" className={f.changeCover}>
                  <Image />
                  Change Answer Image
                </label>
                <input
                    className={f.inputFile}
                    id="answer-img-input"
                    type="file"
                    onChange={handleAnswerFileChange}
                />
              </div>
          ) : (
              <div className={f.contentComponents}>
                <TextField
                    inputId={'Input2'}
                    label={'Answer'}
                    placeholder={'Answer'}
                    errorMessage={errors.answer?.message}
                    {...register('answer')}
                />
              </div>
          )}
          <div className={`${f.contentBtn} ${f.contentBtns}`}>
            <Button classNameBtnBox={f.btnBox} onClick={handleModalToggle} variant={'secondary'}>
              Close
            </Button>
            <Button
              classNameBtnBox={f.btnBox}
              variant={'primary'}
              disabled={!!errors.answer?.message}
              type={'submit'}
            >
              Add Card
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
