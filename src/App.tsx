import { Router } from '@/api/router'

import s from './app.module.scss'

import { Header } from './components/ui/header/header'

export function App() {
  return (
    <>
      <Header isLoggedIn />
      <div className={s.container}>
        <Router />
      </div>
    </>
  )
}
