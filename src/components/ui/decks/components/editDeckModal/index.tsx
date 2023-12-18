import {ResponseDeckType, useUpdateDeckMutation} from '@/api/decks/decks.api.ts'
import {useForm} from 'react-hook-form'
import {ChangeEvent, useState} from 'react'
import {Modal, ModalTitle} from '@/components/ui/modal'
import {EditIcon} from '@/asserts/icons/components/EditIcon.tsx'
import s from '@/components/ui/decks/decksPage.module.scss'
import {Button} from '@/components/ui/button'
import {TextField} from '@/components/ui/textField'
import {CheckBox} from '@/components/ui/checkbox'
import {z} from 'zod'
import {handleFileChange} from "@/components/ui/cards/components/addEditCard/handleFileChange.ts";
import {ImageSelector} from "@/components/ui/cards/components/addEditCard/ImageSelector.tsx";

const schema = z.object({
    cover: z.array(z.instanceof(File)),
    name: z.string().min(3),
    isPrivate: z.boolean().default(false),
})

type Form = z.infer<typeof schema>

export type EditDeckModalProps = {
    deck: ResponseDeckType
}

export const EditDeckModal = ({deck}: EditDeckModalProps) => {
    const [updateDeck] = useUpdateDeckMutation()
    const {
        register,
        setValue,
        setError,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Form>()

    const [selectedImage, setSelectedImage] = useState(deck.cover)
    const [isPrivate, setIsPrivate] = useState(false)
    const [open, setOpen] = useState(false)


    const handleEditFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleFileChange({
            event: event,
            setSelectedImage: setSelectedImage,
            setValue: setValue,
            inputName: 'cover',
        });
    };
    const handleCloseModal = () => {
        reset()
        setOpen(false)
    }

    const handeCheckedChange = () => {
        setIsPrivate(prevState => !prevState)
    }

    const deleteDeckCover = () => {
        setSelectedImage('')
    }

    const onSubmit = handleSubmit(data => {
        const form = new FormData()

        if (data.cover && data.cover.length > 0) {
            form.append('cover', data.cover[0])
        }

        if (!selectedImage) {
            form.append('cover', selectedImage)
        }
        form.append('name', data.name)
        form.append('isPrivate', String(isPrivate))

        if (data.name.trim() !== '' && data.name.length >= 3) {
            updateDeck({
                id: deck.id,
                form,
            })
            handleCloseModal()
        } else {
            setError('name', {message: 'String must contain at least 3 character(s)'})
        }
    })
    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            triggerName={
                <button>
                    <EditIcon/>
                </button>
            }
        >
            <ModalTitle title={'Edit Pack'}/>
            <form onSubmit={onSubmit}>
                <div className={s.contentComponents}>
                    <ImageSelector
                        selectedImage={selectedImage}
                        deleteLabel={'Delete Cover'}
                        onChange={handleEditFileChange}
                        changeLabel={'Change Cover'}
                        inputId={'input__file'}
                        onImageDelete={deleteDeckCover}/>

                    <TextField
                        inputId={'Name Pack'}
                        label={'Name Pack'}
                        placeholder={'Name'}
                        errorMessage={errors.name?.message}
                        {...register('name',{value:deck.name})}
                    />
                    <CheckBox
                        IconID={'checkbox-unselected'}
                        SelectedIconID={'checkbox-selected'}
                        checkboxId={'Private Pack'}
                        disabled={false}
                        height={'24'}
                        label={'Private pack'}
                        width={'24'}
                        checked={isPrivate}
                        onChange={handeCheckedChange}
                    />
                </div>
                <div className={`${s.contentBtn} ${s.contentBtns}`}>
                    <Button
                        classNameBtnBox={s.btnBox}
                        onClick={handleCloseModal}
                        variant={'secondary'}
                        type={'button'}
                    >
                        Cancel
                    </Button>
                    <Button
                        classNameBtnBox={s.btnBox}
                        onSubmit={onSubmit}
                        variant={'primary'}
                        disabled={!!errors.name?.message}
                        type={'submit'}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
