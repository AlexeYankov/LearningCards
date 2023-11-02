import { Provider } from 'react-redux'

import { store } from './api/store'
import { Header } from '@/components/ui/packs/components/header/header.tsx'
import { SignIn } from '@/components/ui/auth/signIn/signIn.tsx'
import s from './app.module.scss'

export function App() {
  return (
    <Provider store={store}>
      {/* <PacksPage /> */}
      <Header isLoggedIn={false} />
      <div className={s.container}>
        <SignIn />
      </div>
      {/*<Router />*/}
    </Provider>
  )
}
