import { Provider } from 'react-redux'

import { Router } from './api/router'
import { store } from './api/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
