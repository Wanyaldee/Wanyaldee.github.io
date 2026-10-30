import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { RepositoriesPage } from '../pages/RepositoriesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RepositoriesPage />
  </StrictMode>,
)
