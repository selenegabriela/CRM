import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NewCustomer, {action as newCustomerAction} from './pages/NewCustomer'
import Index, {loader as customerLoader} from './pages/Index'
import EditCustomer, {loader as editCustomerLoader} from './pages/EditCustomer'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: customerLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/customers/new',
        element: <NewCustomer />,
        action: newCustomerAction
      },
      {
        path: '/customers/:id/edit',
        element: <EditCustomer/>,
        loader: editCustomerLoader,
        errorElement: <ErrorPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
