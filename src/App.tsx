import { Provider } from 'react-redux'

import { store } from './api/store'
import { Router } from './api/router'
import { Header } from '@/components/ui/packs/components/header/header.tsx'

export function App() {
  return (
    <Provider store={store}>
      {/* <PacksPage /> */}
      <Header />

      <Router />
    </Provider>
  )
}
