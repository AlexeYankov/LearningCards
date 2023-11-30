import {ChangeEvent, FC, useState} from 'react'
import {Button} from '../../../button/button.tsx'
import s from '../../../modal/modal.module.scss'
import {Select} from "@/components/ui/select";
import {TextField} from "@/components/ui/textField";
import {Modal, ModalTitle} from "@/components/ui/modal";
import {useAppSelector} from "@/api/store.ts";
import {CreateCardParams, useCreateCardMutation} from "@/api/common.api.ts";
import {z} from "zod";
import {useForm} from 'react-hook-form'
import f from "@/components/ui/packs/packsPage.module.scss";
import {Image} from "@/asserts/icons/components/Image.tsx";

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


export const AddCard: FC<Props> = ({id}) => {
    const [selectedImage, setSelectedImage] = useState('')
    const [open, setOpen] = useState(false)
    // const [isPrivate, setIsPrivate] = useState(false)
    const valueSelect = useAppSelector(state => state.cards.valueSelect)

    const {
        register,
        setValue,
        setError,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Form>()

    const [createCard] = useCreateCardMutation();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            console.log(file)
            setSelectedImage(imageUrl)
            setValue('questionImg', [file])
        } else {
            setSelectedImage('')
            setValue('questionImg', [])
        }
    }


    const onSubmit = handleSubmit(data => {
        const form = new FormData()
        if (data.questionImg && data.questionImg.length > 0) {
            form.append('questionImg', data.questionImg[0])
            console.log(data)
        }
        form.append('question', data.question)
        form.append('answer', data.answer)
        // createCard({id:id!,data})
        if ((data.answer.trim() !== '' && data.answer.length >= 3) ||
            (data.question.trim() !== '' && data.question.length >= 3)) {
            createCard({data, id:id!})
            reset()
            setSelectedImage('')            // setOpenedModalIndex(null)
        } else {
            setError('question', {message: 'String must contain at least 3 character(s)'})
            setError('answer', {message: 'String must contain at least 3 character(s)'})
        }
    })


    return (
        <>

            <Modal className={s.contentComponents} triggerName={<Button>Add new card</Button>}>
                <ModalTitle title={'Add New Card'}/>
                <Select
                    classname={s.select}
                    label={'Choose question format'}
                    options={['Text', 'Picture']}
                    reversed
                    selectId={'Select-box'}
                />
                <form onSubmit={onSubmit}>
                    {valueSelect === 'Picture' ? (
                        <div className={f.contentComponents}>
                            <img className={f.img} src={selectedImage || ''}/>
                            <label htmlFor="input__file" className={f.changeCover}>
                                <Image/>
                                Change Cover
                            </label>
                            <input
                                className={f.inputFile}
                                id={'input__file'}
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <>

                            <TextField
                                inputId={'Input1'}
                                label={'Question'}
                                placeholder={'Question'}
                                errorMessage={errors.question?.message}
                                {...register('question')}
                            />


                            <TextField
                                inputId={'Input2'}
                                label={'Answer'}
                                placeholder={'Answer'}
                                errorMessage={errors.answer?.message}
                                {...register('answer')}
                            />

                        </>
                    )
                    }
                    <div className={`${s.contentBtn} ${s.contentBtns}`}>
                        <Button classNameBtnBox={s.btnBox} variant={'secondary'}>
                            Close
                        </Button>
                        <Button
                            classNameBtnBox={s.btnBox}
                            variant={'primary'}
                            // disabled={!!errors.answer?.message}
                            type={'submit'}>
                            Add Card
                        </Button>
                    </div>
                </form>
            </Modal>


        </>
    )
}
