import {TextField} from '@/components/ui/textField'
import f from '../../cardsPage.module.scss'
import {ChangeEvent} from "react";


type Props = {
    onChange: (value: string) => void
    value:string
}
export const PageBar = ({onChange,value}:Props) => {
    const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }
    const handleClearSearchValueClick = () => {
        onChange('')
    }
    return (
        <div className={f.container__pageBar}>
            <TextField  value={value} onChange={handleSearchValue} onClearClick={handleClearSearchValueClick}
                       placeholder={'Input search'} search/>
        </div>
    )
}
