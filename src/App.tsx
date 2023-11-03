import { Provider } from 'react-redux'

import { store } from './api/store'
import { Header } from '@/components/ui/packs/components/header/header'
import s from './app.module.scss'
import { Router } from '@/api/router'

export function App() {
  return (
    <Provider store={store}>
      <Header isLoggedIn={true} />
      <div className={s.container}>
        <Router />
      </div>
    </Provider>
  )
}
