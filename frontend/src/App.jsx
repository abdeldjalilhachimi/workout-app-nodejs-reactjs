import { RouterProvider } from 'react-router-dom'
import { router } from './utils/creatRoutes'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
