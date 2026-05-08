import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from 'react-router-dom'
import './index.css'
import Lista from '../src/components/TareasCompletas.jsx'
import Formulario from '../src/components/Formulario.jsx' 

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Formulario />} />
      <Route path='Tareas' element={<Lista />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
