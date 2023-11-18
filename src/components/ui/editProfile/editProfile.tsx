import {useState} from 'react'
import profileImage from '@/asserts/profileImage.png'
import {Edit} from '@/asserts/icons/components/Edit'
import s from './editProfile.module.scss'
import {EditableSpan} from './editableSpan/editableSpan'
import {Card} from "@/components/ui/card";
import {Typography} from "@/components/ui/typography";

export const EditProfile = ({name = 'Ivan'}) => {
    const [value, setValue] = useState(name)
    const handleValueChange = (newValue: string) => {
        setValue(newValue)
    }

    return (
        <Card>
            <div className={s.cards}>
                <Typography as={'span'} className={s.text} variant={'large'} >Personal information</Typography>
                <div className={s.photoBlock}>
                    <img alt={''} className={s.logoProfileEdit} src={profileImage}/>
                    <div className={s.editIconBlock}>
                        <label htmlFor="input__file" className={s.editIcon}><Edit/></label>
                    </div>
                    <input id="input__file" style={{display: 'none'}} type="file"/>
                </div>
                <EditableSpan onChange={handleValueChange} value={value}/>
            </div>
        </Card>
    )
}
