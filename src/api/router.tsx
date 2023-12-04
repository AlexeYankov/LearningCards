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
import { SignUp } from '@/components/ui/auth/signUp/signUp'
import { CardsPage } from '@/components/ui/cards/cardsPage'
import { DecksPage } from '@/components/ui/decks/decksPage'
import { useMeQuery } from '@/api/auth-api/auth.api.ts'
import { Layout } from '@/components/ui/header/header.tsx'
import { Login } from '@/pages/login.tsx'
import { EditProfile } from '@/components/ui/editProfile/editProfile.tsx'
import { Loader } from '@/components/ui/loader/loader.tsx'
import {LearnPack} from "@/components/ui/decks/components/learnDeckModal/learnPack.tsx";

const publicRoutes: RouteObject[] = [
  {
    element: <Login />,
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
    path: '/checkEmail',
  },
  {
    element: <ForgotYourPassword />,
    path: '/forgotYourPassword',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element:<LearnPack/>,
    path:'/:id/learn'
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
    element: <Layout />,
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
  },
])

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  if (isLoading) return <Loader />
  return !isError ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
