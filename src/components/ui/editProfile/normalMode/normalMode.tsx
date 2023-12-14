import s from "@/components/ui/editProfile/editProfile.module.scss";
import {Typography} from "@/components/ui/typography";
import {EditIcon} from "@/asserts/icons/components/EditIcon.tsx";
import {Button} from "@/components/ui/button";
import {LogoutIcon} from "@/asserts/icons/components/LogoutIcon.tsx";
import {changeEditModeProfile, changeTitleProfile} from "@/api/profile/profile.reducer.ts";
import {useAppDispatch} from "@/api/store.ts";
import {useLogOutMutation} from "@/api/auth-api/auth.api.ts";


type Props = {
    name: string
    email: string
}
export const NormalMode = ({name, email}: Props) => {
    const dispatch = useAppDispatch()
    const [logout] = useLogOutMutation()
    const activateEditMode = () => {
        dispatch(changeEditModeProfile({editMode: true}))
        dispatch(changeTitleProfile({title:name}))
    }
    const onClickLogOut = () => {
        logout()
    }
    return (
        <>
            <div className={s.nameBlock}>
                <Typography variant={'heading1'} className={s.name}>
                    {name || 'name'}
                </Typography>
                <div onClick={activateEditMode} className={s.editIcon}>
                    <EditIcon/>
                </div>
            </div>
            <div className={s.email}>{email || 'Email'}</div>
            <div>
                <Button
                    onClick={onClickLogOut}
                    icon={<LogoutIcon/>}
                    children={'Logout'}
                    variant={'secondary'}
                />
            </div>
        </>
    );
};

