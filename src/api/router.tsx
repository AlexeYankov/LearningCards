import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { CardsPage } from '@/components/ui/cards/cardsPage'
import { PacksPage } from '@/components/ui/packs/packsPage'

const publicRoutes: RouteObject[] = [
  {
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
    path: '/decks/clo9m4k9w17wcvo2qfo5tgyfs',
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
