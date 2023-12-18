import {ChangeEvent, useState} from 'react'
import s from './editProfile.module.scss'
import userImg from '../../../asserts/userImg.png'
import {Typography} from '@/components/ui/typography'
import {Card} from '@/components/ui/card'
import {EditIcon} from '@/asserts/icons/components/EditIcon.tsx'
import {Button} from '@/components/ui/button'
import {LogoutIcon} from '@/asserts/icons/components/LogoutIcon.tsx'
import {TextField} from '@/components/ui/textField'
import {UpdateUserArgsType, useLogOutMutation, useMeQuery, useUpdateUserMutation,} from '@/api/auth-api/auth.api.ts'
import {ArrowBackIcon} from '@/asserts/icons/components/ArrowBackIcon.tsx'
import {Link} from 'react-router-dom'
import {toast} from "react-toastify";
import {ErrorComponent} from "@/utils/toastify/Error.tsx";

export const EditProfile = () => {
    const {data} = useMeQuery()
    const [logout] = useLogOutMutation()
    const [update] = useUpdateUserMutation()
    const [value, setValue] = useState(data?.name || 'UserName')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const uploadContent = (event: ChangeEvent<HTMLInputElement>) => {
        const bodyFormData = new FormData();
        if (event.target.files) {
            const file = event.target.files[0];
            const fileSizeInMB = file.size / (1024 * 1024); // Размер файла в МБ
            if (fileSizeInMB > 1) {
                toast.error('Max image size 1MB');
                return;
            }
            bodyFormData.append('avatar', file);
            toast.promise(
                update(bodyFormData as UpdateUserArgsType),
                {
                    pending: 'Uploading...',
                    success: 'Your avatar successfully changed',
                    error: 'An error occurred while uploading'
                }
            )
        }
    };
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        if (title.trim() === '') {
            setValue('UserName')
            update({name: 'UserName'})
        } else {
            setValue(title)
            if (value !== title) {
                toast.promise(
                    update({name: title}),
                    {
                        pending: 'Uploading...',
                        success: 'Your name successfully changed',
                        error: 'An error occurred while uploading'
                    }
                )
            }
        }
    }
    const handleOnchangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickLogOut = () => {
        logout()
    }

    return (
        <>
            {/*<Toastify/>*/}
            <ErrorComponent/>
            <Link className={s.backLink} to={'/'}>
                <ArrowBackIcon/>
                Back to Packs List
            </Link>
            <Card>
                <div className={s.cards}>
                    <Typography as={'span'} className={s.text} variant={'large'}>
                        Personal Information
                    </Typography>
                    <div className={s.photoBlock}>
                        <img
                            alt={'Photo profile'}
                            className={s.logoProfileEdit}
                            src={data?.avatar || userImg}
                        />
                        <div className={s.editIconBlock}>
                            <label htmlFor="input__file" className={s.editIcon}>
                                <EditIcon/>
                            </label>
                        </div>
                        <input
                            onChange={uploadContent}
                            accept={'image/*'}
                            id="input__file"
                            className={s.hidden}
                            type="file"
                        />
                    </div>
                    {!editMode && (
                        <>
                            <div className={s.nameBlock}>
                                <Typography variant={'heading1'} className={s.name}>
                                    {value}
                                </Typography>
                                <div onClick={activateEditMode} className={s.editIcon}>
                                    <EditIcon/>
                                </div>
                            </div>
                            <div className={s.email}>{data?.email || 'Email'}</div>
                            <div>
                                <Button
                                    onClick={onClickLogOut}
                                    icon={<LogoutIcon/>}
                                    children={'Logout'}
                                    variant={'secondary'}
                                />
                            </div>
                        </>
                    )}
                    {editMode && (
                        <form style={{width: '100%'}}>
                            <TextField
                                maxLength={25}
                                autoFocus
                                label={'Nickname'}
                                type={'text'}
                                className={s.textField}
                                value={title}
                                onChange={handleOnchangeTitle}
                            />
                            <Button
                                children={'Save Changes'}
                                className={s.button}
                                fullWidth
                                variant={'primary'}
                                onClick={activateViewMode}
                            />
                        </form>
                    )}
                </div>
            </Card>
        </>
    )
}
