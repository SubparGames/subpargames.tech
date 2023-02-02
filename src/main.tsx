import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom'
import Root from './routes/root'
import './styles/index.css'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
  },
]

// Create a browser router called router
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
