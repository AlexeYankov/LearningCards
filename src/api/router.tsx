import { PacksPage } from '@/components/ui/packs/packsPage'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { SignIn } from '@/components/ui/auth/signIn/signIn'
import { SignUp } from '@/components/ui/auth/signUp/signUp'
import { CreateNewPassword } from '@/components/ui/auth/createNewPassword'
import { CheckEmail } from '@/components/ui/auth/checkEmail'
import { ForgotYourPassword } from '@/components/ui/auth/forgotYourPassword'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    path: '/createNewPassword',
    element: <CreateNewPassword />,
  },
  {
    path: '/checkEmail',
    element: <CheckEmail />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotYourPassword />,
  },
  {
    path: '/createNewPassword',
    element: <CreateNewPassword />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PacksPage />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },

  ...publicRoutes,
])

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
  // const result = useGetDecksQuery()
  // const cards = useGetCardsQuery('clogyz1ef1b3uvo2qac2uhhsj')
  return <RouterProvider router={router} />
}
