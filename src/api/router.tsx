import { PacksPage } from '@/components/ui/packs/packsPage'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { CardsPage } from '@/components/ui/cards/cardsPage'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/decks',
    element: <PacksPage />,
  },
  {
    path: '/decks/clo9m4k9w17wcvo2qfo5tgyfs',
    element: <CardsPage />,
    // children: [
    //   {
    //     path: `${id}`,
    //     element: <CardsPage id={id} />,
    //   },
    // ],
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
  return <RouterProvider router={router} />
}
