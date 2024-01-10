import { ToastContainer } from 'react-toastify'

import { Router } from '@/api/router'

export function App() {
  return (
    <>
      <Router />
      {/*<AppRouter />*/}
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        limit={1}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
        theme={'dark'}
      />
    </>
  )
}
