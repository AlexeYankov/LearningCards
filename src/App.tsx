import { Provider } from 'react-redux'

import { store } from './api/store'
import { Router } from './api/router'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
