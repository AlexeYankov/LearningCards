import * as Toggle from '@radix-ui/react-toggle';
import {FontItalicIcon} from '@radix-ui/react-icons';
import s from './switch.module.scss'
import {useTranslation} from "react-i18next";

export enum Lang {
    EN = 'en',
    RU = 'ru',
}
export const SwitchLang = () => {
    const { i18n } = useTranslation()

    const toggleLanguage = async () => {
        const newLang = i18n.language === Lang.RU ? Lang.EN : Lang.RU
        i18n.changeLanguage(newLang)
    }
    return (
        <div className={s.switch}>
            <Toggle.Root className={s.toggle} onClick={toggleLanguage} aria-label="Toggle italic">
                <FontItalicIcon />
            </Toggle.Root>

            {/*<label className={s.Label} htmlFor="airplane-mode">*/}
            {/*    eng*/}
            {/*</label>*/}
            {/*<Switch.Root onClick={toggleLanguage}  className={s.SwitchRoot} id="airplane-mode">*/}
            {/*    <Switch.Thumb className={s.SwitchThumb} />*/}
            {/*</Switch.Root>*/}
            {/*<label className={s.Label}> rus </label>*/}
        </div>
    );
};



// import * as Switch from "@radix-ui/react-switch";
// import s from './switch.module.scss'
// import {useTranslation} from "react-i18next";
//
// export enum Lang {
//     EN = 'en',
//     RU = 'ru',
// }
// export const SwitchLang = () => {
//     const { i18n } = useTranslation()
//
//     const toggleLanguage = async () => {
//         const newLang = i18n.language === Lang.RU ? Lang.EN : Lang.RU
//         i18n.changeLanguage(newLang)
//     }
//     return (
//             <div className={s.switch}>
//                 <label className={s.Label} htmlFor="airplane-mode">
//                     eng
//                 </label>
//                 <Switch.Root onClick={toggleLanguage}  className={s.SwitchRoot} id="airplane-mode">
//                     <Switch.Thumb className={s.SwitchThumb} />
//                 </Switch.Root>
//                 <label className={s.Label}> rus </label>
//             </div>
//     );
// };