// import { Route, BrowserRouter as Router, Routes, useSearchParams } from 'react-router-dom'
//
// import { authRoutes, publicRoutes } from '@/api/Newrouter'
// import { useMeQuery } from '@/api/auth'
// import { Layout } from '@/components/ui/header'
//
// export const AppRouter = () => {
//   const { data: me } = useMeQuery()
//   const [searchParams, setSearchParams] = useSearchParams()
//
//   setSearchParams({ ...searchParams, ru: localStorage.getItem('lang') || '' })
//
//   return (
//     <Router>
//       <Routes>
//         {me &&
//           authRoutes.map(({ element, path }) => <Route element={element} key={path} path={path} />)}
//         {publicRoutes.map(({ element, path }) => (
//           <Route element={element} key={path} path={path} />
//         ))}
//         <Route element={<Layout />} path={'*'} />
//       </Routes>
//     </Router>
//   )
// }
