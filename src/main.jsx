import {  createRoot  } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Musicas from './Musicas.jsx'

const paginas = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/Musicas/:id', element: <Musicas/>},
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas}/> 
)
