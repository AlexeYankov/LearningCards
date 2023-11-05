import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { CardsPage } from '@/components/ui/cards/cardsPage'
import { PacksPage } from '@/components/ui/packs/packsPage'
import { SignIn } from '@/components/ui/auth/signIn/signIn'
import { SignUp } from '@/components/ui/auth/signUp/signUp'
import { CreateNewPassword } from '@/components/ui/auth/createNewPassword'
import { CheckEmail } from '@/components/ui/auth/checkEmail'
import { ForgotYourPassword } from '@/components/ui/auth/forgotYourPassword'
import { PacksPage } from '@/components/ui/packs/packsPage.tsx'
import { PacksList } from '@/components/ui/packs/components/packsList/packsList.tsx'

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
    element: <div>login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <PacksPage />,
    path: '/decks',
  },
  {
    element: <CardsPage />,
    path: '/decks/:id',
    // children: [
    //   {
    //     path: `${id}`,
    //     element: <CardsPage id={id} />,
    //   },
    // ],
  },
  {
    path: '/1',
    element: <PacksList />,
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
