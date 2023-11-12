import { Provider } from 'react-redux'

import ReactDOM from 'react-dom/client'

import './styles/index.scss'

import { App } from './App'
import { store } from './api/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
