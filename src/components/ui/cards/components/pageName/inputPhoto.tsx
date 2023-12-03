// import {Image} from "@/asserts/icons/components/Image.tsx";
// import {useForm} from "react-hook-form";
// import {CreateCardParams, useCreateCardMutation} from "@/api/common.api.ts";
// import {z} from "zod";
// import {ChangeEvent, FC, useState} from "react";
// import {CreateDeckArgType} from "@/api/decks/decks.api.ts";
// import {TextField} from "@/components/ui/textField";
// import {CheckBox} from "@/components/ui/checkbox";
// import {Button} from "@/components/ui/button";
//
//
// const schema = z.object({
//     cover: z.array(z.instanceof(File)),
//     name: z.string().min(3),
// })
//
// type Form = z.infer<typeof schema>
//
// type Props = {
//     id: string | undefined
// }
//
// export const InputPhoto: FC<Props> = ({id}) => {
//     const [open, setOpen] = useState(false)
//
//     const [selectedImage, setSelectedImage] = useState('')
//
//     const {
//         register,
//         setValue,
//         setError,
//         handleSubmit,
//         reset,
//         formState: {errors},
//     } = useForm<Form>()
//     const [createCard] = useCreateCardMutation();
//
//     const handleModalToggle = () => {
//         setOpen(prevState => !prevState)
//         reset()
//         setSelectedImage('')
//     }
//
//
//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0]
//
//         if (file) {
//             const imageUrl = URL.createObjectURL(file)
//             setSelectedImage(imageUrl)
//             setValue('cover', [file])
//         } else {
//             setSelectedImage('')
//             setValue('cover', [])
//         }
//     }
//
//     const onSubmit = handleSubmit(data => {
//         const form = new FormData()
//         if (data.cover && data.cover.length > 0) {
//             form.append('cover', data.cover[0])
//         }
//         form.append('name', data.name)
//         console.log(data.cover)
//         if (data.name.trim() !== '' && data.name.length >= 3) {
//             createCard(form as unknown as CreateCardParams)
//             handleModalToggle()
//         } else {
//             setError('name', {message: 'String must contain at least 3 character(s)'})
//             setOpen(true)
//         }
//     })
//
//
//     //
//     // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     //     const file = event.target.files?.[0]
//     //     if (file) {
//     //         const imageUrl = URL.createObjectURL(file)
//     //         setSelectedImage(imageUrl)
//     //         setValue('questionImg', [file])
//     //     } else {
//     //         setSelectedImage('')
//     //         setValue('questionImg', [])
//     //     }
//     // }
//     // const onSubmit = handleSubmit(data => {
//     //     const form = new FormData()
//     //     if ((data.questionImg && data.questionImg.length > 0)
//     //         || (data.answerImg && data.answerImg.length > 0)) {
//     //         form.append('cover', data.questionImg[0])
//     //         createCard({...data as unknown as CreateCardParams, id})
//     //     }
//     //     console.log(data.questionImg)
//     //     // if ((data.answer.trim() !== '' && data.answer.length >= 3) ||
//     //     //     (data.question.trim() !== '' && data.question.length >= 3)) {
//     //     //     createCard({...data as unknown as CreateCardParams, id})
//     //     //     reset()
//     //     //     setSelectedImage('')            // setOpenedModalIndex(null)
//     //     // } else {
//     //     //     setError('question', {message: 'String must contain at least 3 character(s)'})
//     //     //     setError('answer', {message: 'String must contain at least 3 character(s)'})
//     //     // }
//     // })
//
//     return (
//
//         <form onSubmit={onSubmit}>
//             <div className={f.contentComponents}>
//                 <img className={f.img} src={selectedImage || ''}/>
//                 <label htmlFor="input__file" className={f.changeCover}>
//                     <Image/>
//                     Change Cover
//                 </label>
//                 <input
//                     className={f.inputFile}
//                     id={'input__file'}
//                     type="file"
//                     onChange={handleFileChange}
//                 />
//                 <TextField
//                     inputId={'Name Pack'}
//                     label={'Name Pack'}
//                     placeholder={'Name'}
//                     errorMessage={errors.name?.message}
//                     {...register('name')}
//                 />
//                 <CheckBox
//                     IconID={'checkbox-unselected'}
//                     SelectedIconID={'checkbox-selected'}
//                     checkboxId={'Private Pack'}
//                     height={'24'}
//                     label={'Private pack'}
//                     width={'24'}
//                 />
//             </div>
//             <div className={`${f.contentBtn} ${f.contentBtns}`}>
//                 <Button
//                     classNameBtnBox={f.btnBox}
//                     onClick={handleModalToggle}
//                     variant={'secondary'}
//                     type={'button'}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     classNameBtnBox={f.btnBox}
//                     variant={'primary'}
//                     disabled={!!errors.name?.message}
//                     type={'submit'}
//                 >
//                     Add New Pack
//                 </Button>
//             </div>
//         </form>
//
//
//     );
// };
// // <form onSubmit={onSubmit}>
// //     <div className={f.contentComponents}>
// //         <img className={f.img} src={selectedImage || ''}/>
// //         <label htmlFor="input__file" className={f.changeCover}>
// //             <Image/>
// //             Change Cover
// //         </label>
// //         <button type={'submit'}>sdsd</button>
// //         <input
// //             className={f.inputFile}
// //             id={'input__file'}
// //             type="file"
// //             onChange={handleFileChange}
// //         />
// //
// //     </div>
// //
// // </form>
