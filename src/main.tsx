import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'

import i18n from '@/api/i18n'
import ReactDOM from 'react-dom/client'

import '@/styles/index.scss'

import { App } from './App'
import { store } from './api/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
)
