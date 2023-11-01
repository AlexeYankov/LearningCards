import { Provider } from 'react-redux'

import { store } from './api/store'
import { PacksPage } from './components/ui/packs/packsPage'

export function App() {
  return (
    <Provider store={store}>
      <div style={{background: 'black', height: '100vh', color: 'white'}}>
        <PacksPage />
      </div>
    </Provider>
  )
}
