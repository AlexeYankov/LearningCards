// import {useForm} from 'react-hook-form'
// import {ChangeEvent, useState} from 'react'
// import {Modal, ModalTitle} from '@/components/ui/modal'
// import {EditIcon} from '@/asserts/icons/components/EditIcon.tsx'
// import {Button} from '@/components/ui/button'
// import {TextField} from '@/components/ui/textField'
// import {z} from 'zod'
// import {CardsResponseType, useUpdateCardMutation} from "@/api/common.api.ts";
// import {Select} from "@/components/ui/select";
// import {useAppSelector} from "@/api/store.ts";
// import s from '../addCard/addCard.module.scss'
// import {handleFileChange} from "@/components/ui/cards/components/addCard/handleFileChange.ts";
// import {ImageSelector} from "@/components/ui/cards/components/addCard/ImageSelector.tsx";
//
// const schema = z.object({
//     questionImg: z.array(z.instanceof(File)),
//     answerImg: z.array(z.instanceof(File)),
//     answer: z.string().min(3),
//     question: z.string().min(3),
// })
// export type Form = z.infer<typeof schema>
//
// type EditCardModalProps = {
//     card: CardsResponseType
// }
//
// export const EditCardModal = ({card}: EditCardModalProps) => {
//
//     const {
//         register,
//         setValue,
//         setError,
//         handleSubmit,
//         reset,
//         formState: {errors},
//     } = useForm<Form>()
//     // const [isPrivate, setIsPrivate] = useState(false)
//     const [open, setOpen] = useState(false)
//     const [selectedQuestionImage, setSelectedQuestionImage] = useState(card.questionImg)
//     const [selectedAnswerImage, setSelectedAnswerImage] = useState(card.answerImg)
//     const valueSelect = useAppSelector(state => state.cards.valueSelect)
//     const [updateCard] = useUpdateCardMutation()
//     const handleCloseModal = () => {
//         reset()
//         setOpen(false)
//     }
//     const deleteCardQuestion = () => {
//         setSelectedQuestionImage('')
//     }
//     const deleteCardAnswer = () => {
//         setSelectedQuestionImage('')
//     }
//     const handleQuestionFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         handleFileChange({
//             setSelectedImage: setSelectedQuestionImage,
//             setValue,
//             event,
//             inputName: 'questionImg',
//         });
//     };
//
//     const handleAnswerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         handleFileChange({
//             setSelectedImage:setSelectedAnswerImage,
//             setValue,
//             event,
//             inputName:'answerImg'
//         });
//     }
//     const onSubmit = handleSubmit(data => {
//         const form = new FormData()
//         if (data.questionImg && data.questionImg.length > 0) {
//             form.append('questionImg', data.questionImg[0])
//             form.append('answerImg', data.questionImg[0])
//         }
//         form.append('question', data.question)
//         form.append('answer', data.answer)
//         if (
//             (data.answer.trim() !== '' && data.answer.length >= 3) ||
//             (data.question.trim() !== '' && data.question.length >= 3)
//         ) {
//             updateCard({
//                 id: card.id,
//                 form
//             })
//             handleCloseModal()
//         } else {
//             setError('question', {message: 'String must contain at least 3 character(s)'})
//             setError('answer', {message: 'String must contain at least 3 character(s)'})
//         }
//     })
//     return (
//         <Modal
//             onOpenChange={setOpen}
//             open={open}
//             className={s.contentComponents}
//             triggerName={
//                 <button>
//                     <EditIcon/>
//                 </button>
//             }
//         >
//             <ModalTitle title={'Edit Card'}/>
//             <div className={s.contentBox}>
//                 <Select
//                     label={'Choose question format'}
//                     options={['Text', 'Picture']}
//                     reversed
//                     selectId={'Select-box'}
//                 />
//                 <form onSubmit={onSubmit} className={s.contentComponents}>
//                     {valueSelect === 'Picture' ? (
//                         <>
//                             <ImageSelector selectedImage={selectedQuestionImage}
//                                            deleteLabel={'Delete Image'}
//                                            onChange={handleQuestionFileChange}
//                                            changeLabel={'Change Question Image'}
//                                            inputId={'input__file'}
//                                            onImageDelete={deleteCardQuestion}/>
//                         </>
//                     ) : (
//                         <TextField
//                             inputId={'Input1'}
//                             label={'Question'}
//                             placeholder={'Question'}
//                             value={card.question}
//                             errorMessage={errors.question?.message}
//                             {...register('question')}
//                         />
//                     )}
//                     {valueSelect === 'Picture' ? (
//                         <>
//                             <ImageSelector selectedImage={selectedAnswerImage}
//                                            deleteLabel={'Delete Image'}
//                                            onChange={handleAnswerFileChange}
//                                            changeLabel={'Change Answer Image'}
//                                            inputId={'input__file2'}
//                                            onImageDelete={deleteCardAnswer}/>
//                         </>
//                     ) : (
//                         <TextField
//                             value={card.answer}
//                             inputId={'Input2'}
//                             label={'Answer'}
//                             placeholder={'Answer'}
//                             errorMessage={errors.answer?.message}
//                             {...register('answer')}
//                         />
//                     )}
//                     <div className={`${s.contentBtn} ${s.contentBtns}`}>
//                         <Button classNameBtnBox={s.btnBox} onClick={handleCloseModal} variant={'secondary'}>
//                             Close
//                         </Button>
//                         <Button
//                             classNameBtnBox={s.btnBox}
//                             variant={'primary'}
//                             disabled={!!errors.answer?.message}
//                             type={'submit'}
//                         >
//                             Add new card
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     )
// }
//
//
//
