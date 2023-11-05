import { store } from '@/api/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={store}>{story()}</Provider>
}

export const BrowserRouterDecorator = (story: any) => {
  return <BrowserRouter>{story()}</BrowserRouter>
}
