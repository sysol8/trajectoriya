import './styles/variables.css';
import './styles/global.css';
import './styles/style.css';
//@ts-ignore
import '@fontsource-variable/arimo'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CarsLayout from "./layouts/CarsLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarsLayout />
  </StrictMode>,
)
