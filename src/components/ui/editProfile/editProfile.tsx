import {ChangeEvent, FormEvent} from 'react'
import s from './editProfile.module.scss'
import {Typography} from '@/components/ui/typography'
import {Card} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {TextField} from '@/components/ui/textField'
import {UpdateUserArgsType, useMeQuery, useUpdateUserMutation,} from '@/api/auth-api/auth.api.ts'
import {ArrowBackIcon} from '@/asserts/icons/components/ArrowBackIcon.tsx'
import {Link} from 'react-router-dom'
import {Photo} from "@/components/ui/editProfile/photo/photo.tsx";
import {useAppDispatch, useAppSelector} from "@/api/store.ts";
import {changeEditModeProfile, changeTitleProfile, changeValueProfile} from "@/api/profile/profile.reducer.ts";
import {NormalMode} from "@/components/ui/editProfile/normalMode/normalMode.tsx";
import {Progress} from "@/components/ui/loader/loader.tsx";

export const EditProfile = () => {
    const dispatch = useAppDispatch()
    const value = useAppSelector((state) => state.profile.value)
    const title = useAppSelector((state) => state.profile.title)
    const editMode = useAppSelector((state) => state.profile.editMode)
    const {data, isFetching} = useMeQuery()
    const [update] = useUpdateUserMutation()
    const uploadContent = (event: ChangeEvent<HTMLInputElement>) => {
        const bodyFormData = new FormData()
        if (event.target.files) {
            bodyFormData.append('avatar', event.target.files[0])
            update(bodyFormData as UpdateUserArgsType)
        }
    }
    const activateViewMode = () => {
        dispatch(changeEditModeProfile({editMode: false}))
        if (!(title.trim() === '')) {
            dispatch(changeValueProfile({value: title}))
            if (value !== title && title !== data?.name) {
                update({name: title})
            }
        }
    }
    const handleOnchangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTitleProfile({title: e.currentTarget.value}))
    }
    const handleClick = (e: FormEvent<HTMLFormElement>) => e.preventDefault()
    if (isFetching) return <Progress/>
    return (
        <>
            <div className={s.boxLink}>
                <Link className={s.backLink} to={'/'}>
                    <ArrowBackIcon/>
                    Back to Packs List
                </Link>
            </div>
            <Card>
                <div className={s.cards}>
                    <Typography as={'span'} className={s.text} variant={'large'}>
                        Personal Information
                    </Typography>
                    <Photo src={String(data?.avatar)} onChange={uploadContent}/>
                    {!editMode && <NormalMode name={String(data?.name)} email={String(data?.email)}/>}
                    {editMode && (
                        <form className={s.form} onSubmit={handleClick}>
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
                                type={'submit'}
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
