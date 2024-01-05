import { Router } from '@/api/router'
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={1}
      />
    </>
  )
}
