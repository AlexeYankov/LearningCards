import s from "@/components/ui/editProfile/editProfile.module.scss";
import userImg from "@/asserts/userImg.png";
import {EditIcon} from "@/asserts/icons/components/EditIcon.tsx";
import {ChangeEvent} from "react";


type Props = {
    src?: string
    onChange: (event:ChangeEvent<HTMLInputElement>) => void
}
export const Photo = ({src, onChange}: Props) => {
    return (
        <div className={s.photoBlock}>
            <img
                alt={'Photo profile'}
                className={s.logoProfileEdit}
                src={src || userImg}
            />
            <div className={s.editIconBlock}>
                <label htmlFor="input__file" className={s.editIcon}>
                    <EditIcon/>
                </label>
            </div>
            <input
                onChange={onChange}
                accept={'image/*'}
                id="input__file"
                className={s.hidden}
                type="file"
            />
        </div>
    );
};
