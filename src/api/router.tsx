import { PacksPage } from '@/components/ui/packs/packsPage'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { useGetCardsQuery, useGetDecksQuery } from './common.api'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
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
