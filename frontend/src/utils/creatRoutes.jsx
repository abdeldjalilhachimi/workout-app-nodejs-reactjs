import { createBrowserRouter } from 'react-router-dom'
import Home, { loader as workoutLoader, workoutAction } from '../pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: workoutLoader,
    action: workoutAction,
  },
])
