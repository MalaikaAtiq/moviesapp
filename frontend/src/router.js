import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard.js'
import App from './App.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  }
]

)

export default router