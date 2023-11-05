import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { CheckEmail } from '@/components/ui/auth/checkEmail'
import { CreateNewPassword } from '@/components/ui/auth/createNewPassword'
import { ForgotYourPassword } from '@/components/ui/auth/forgotYourPassword'
import { SignIn } from '@/components/ui/auth/signIn/signIn'
import { SignUp } from '@/components/ui/auth/signUp/signUp'
import { CardsPage } from '@/components/ui/cards/cardsPage'
import { PacksPage } from '@/components/ui/packs/packsPage'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
  {
    element: <SignUp />,
    path: '/signUp',
  },
  {
    element: <CreateNewPassword />,
    path: '/createNewPassword',
  },
  {
    element: <CheckEmail />,
    path: '/checkEmail',
  },
  {
    element: <ForgotYourPassword />,
    path: '/forgotPassword',
  },
  {
    element: <CreateNewPassword />,
    path: '/createNewPassword',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <PacksPage />,
    path: '/',
  },
  {
    element: <CardsPage />,
    path: '/:id',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },

  ...publicRoutes,
])

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
