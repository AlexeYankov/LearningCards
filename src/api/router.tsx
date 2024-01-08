import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useMeQuery } from '@/api/auth'
import { CheckEmail } from '@/components/ui/auth/checkEmail'
import { CreateNewPassword } from '@/components/ui/auth/createNewPassword'
import { ForgotYourPassword } from '@/components/ui/auth/forgotYourPassword'
import { SignIn } from '@/components/ui/auth/signIn'
import { SignUp } from '@/components/ui/auth/signUp/signUp'
import { CardsPage, LearnDeck } from '@/components/ui/cards'
import { DecksPage } from '@/components/ui/decks'
import { EditProfile } from '@/components/ui/editProfile'
import { Layout } from '@/components/ui/header'
import { Progress } from '@/components/ui/loader'

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
    path: '/createNewPassword/*',
  },
  {
    element: <CheckEmail />,
    path: '/:email/checkEmail',
  },
  {
    element: <ForgotYourPassword />,
    path: '/forgotYourPassword',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <LearnDeck />,
    path: '/:id/learn',
  },
  {
    element: <DecksPage />,
    path: '/',
  },
  {
    element: <CardsPage />,
    path: '/:id',
  },
  {
    element: <EditProfile />,
    path: '/profile',
  },
]

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Layout />,
  },
])

export function PrivateRoutes() {
  const { error, isLoading } = useMeQuery()

  if (isLoading) {
    return <Progress />
  }

  return !error ? <Outlet /> : <Navigate to={'/login'} />
}

export function PublicRoutes() {
  const { isFetching, isSuccess } = useMeQuery()

  if (isFetching) {
    return <Progress />
  }

  return !isSuccess ? <Outlet /> : <Navigate to={'/'} />
}

export const Router = () => {
  // const navigate = useNavigate()
  // const location = useLocation()
  //
  // const currentPath = location.pathname
  //
  // const newPath = `/${localStorage.getItem('lang')}${currentPath}`
  //
  // navigate(newPath)

  return <RouterProvider router={router} />
}
