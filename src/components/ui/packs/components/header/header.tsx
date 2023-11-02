import s from '../../../editProfile/editProfile.module.scss'
import f from './header.module.scss'


import logo from '@/asserts/Logo.png'
import profileImage from '@/asserts/profileImage.png'

export const Header = () => {
  return (
    <div className={f.container}>
      <div className={s.container}>
        <header className={s.header}>
          <img alt={''} className={s.logo} src={logo}/>
          <div className={s.textHeader}>
            Ivan <img alt={''} className={s.logoProfile} src={profileImage} />
          </div>
        </header>
      </div>
    </div>
  )
}
