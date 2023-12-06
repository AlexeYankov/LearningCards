import {ChangeEvent, FC, useState} from 'react'
import {Button} from '../../../button/button.tsx'
import {Select} from '@/components/ui/select'
import {TextField} from '@/components/ui/textField'
import {Modal, ModalTitle} from '@/components/ui/modal'
import {useAppSelector} from '@/api/store.ts'
import {CardsResponseType, useCreateCardMutation, useUpdateCardMutation} from '@/api/common.api.ts'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import s from './addCard.module.scss'
import {handleFileChange} from "@/components/ui/cards/components/addCard/handleFileChange.ts";
import {EditIcon} from "@/asserts/icons/components/EditIcon.tsx";
import {ImageSelector} from "@/components/ui/cards/components/addCard/ImageSelector.tsx";

type Props = {
    id?: string
    editIcon?: any
    card?: CardsResponseType
}

const schema = z.object({
    questionImg: z.array(z.instanceof(File)),
    answerImg: z.array(z.instanceof(File)),
    answer: z.string().min(3),
    question: z.string().min(3),
})

type Form = z.infer<typeof schema>

export const AddCard: FC<Props> = ({id, editIcon, card}) => {
    const [selectedQuestionImage, setSelectedQuestionImage] = useState('')
    const [selectedAnswerImage, setSelectedAnswerImage] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedEditQuestionImage, setSelectedEditQuestionImage] = useState(card?.questionImg)
    const [selectedEditAnswerImage, setSelectedEditAnswerImage] = useState(card?.answerImg)

    // const [isPrivate, setIsPrivate] = useState(false)
    const valueSelect = useAppSelector(state => state.cards.valueSelect)
    console.log(selectedEditQuestionImage)
    const {
        register,
        setValue,
        setError,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Form>()

    const [createCard] = useCreateCardMutation()
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
    }
    const handleQuestionFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleFileChange({
            setSelectedImage: editIcon ? setSelectedEditQuestionImage : setSelectedQuestionImage,
            setValue,
            event,
            inputName: 'questionImg',
        });
    };

    const handleAnswerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleFileChange({
            setSelectedImage: editIcon ? setSelectedEditAnswerImage : setSelectedAnswerImage,
            setValue,
            event,
            inputName: 'answerImg'
        });
    }

    const onSubmit = handleSubmit(data => {
        const form = new FormData()
        if (data.questionImg && data.answerImg.length > 0) {
            form.append('questionImg', data.questionImg[0])
            form.append('answerImg', data.answerImg[0])
        }
        form.append('question', data.question)
        form.append('answer', data.answer)
        if (
            (data.answer.trim() !== '' && data.answer.length >= 3) ||
            (data.question.trim() !== '' && data.question.length >= 3)
        ) {
            if (editIcon) {
                updateCard({
                    id: card?.id!,
                    form
                })
            } else {
                createCard({id: id!, data: form})
            }
            handleModalToggle()
        } else {
            setError('question', {message: 'String must contain at least 3 character(s)'})
            setError('answer', {message: 'String must contain at least 3 character(s)'})
        }
    })

    return (
        <Modal
            onOpenChange={handleModalToggle}
            open={open}
            className={s.contentComponents}
            triggerName={
                editIcon ? <button>
                        <EditIcon/>
                    </button>
                    :
                    <Button>Add new card</Button>}
        >
            {editIcon ? <ModalTitle title={'Edit Card'}/> : <ModalTitle title={'Add New Card'}/>}

            <div className={s.contentBox}>
                <Select
                    label={'Choose question format'}
                    options={['Text', 'Picture']}
                    reversed
                    selectId={'Select-box'}
                />
                <form onSubmit={onSubmit} className={s.contentComponents}>
                    {valueSelect === 'Picture' ? (
                        <>
                            <>
                                <ImageSelector
                                    selectedImage={editIcon ? selectedEditQuestionImage : selectedQuestionImage}
                                    deleteLabel={editIcon ? 'Delete Image' : ''}
                                    onChange={handleQuestionFileChange}
                                    changeLabel={'Change Question Image'}
                                    inputId={'question-img-input'}
                                    onImageDelete={deleteCardQuestion}/>
                            </>

                        </>
                    ) : (
                        <TextField
                            inputId={'Input1'}
                            label={'Question'}
                            placeholder={'Question'}
                            errorMessage={errors.question?.message}
                            {...register('question')}
                        />
                    )}
                    {valueSelect === 'Picture' ? (
                        <>
                            <ImageSelector selectedImage={editIcon ? selectedEditAnswerImage : selectedAnswerImage}
                                           deleteLabel={editIcon ? 'Delete Image' : ''}
                                           onChange={handleAnswerFileChange}
                                           changeLabel={'Change Question Image'}
                                           inputId={'answer-img-input'}
                                           onImageDelete={deleteCardAnswer}/>
                        </>
                    ) : (
                        <TextField
                            inputId={'Input2'}
                            label={'Answer'}
                            placeholder={'Answer'}
                            errorMessage={errors.answer?.message}
                            {...register('answer')}
                        />
                    )}
                    <div className={`${s.contentBtn} ${s.contentBtns}`}>
                        <Button classNameBtnBox={s.btnBox} onClick={handleModalToggle} variant={'secondary'}>
                            Close
                        </Button>
                        <Button
                            classNameBtnBox={s.btnBox}
                            variant={'primary'}
                            disabled={!!errors.answer?.message}
                            type={'submit'}
                        >
                            {editIcon ? 'Save Changes' : 'Add new card'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
