import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { router } from './Routes/Routes'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} /> {/* Wrap the application with RouterProvider */}
    </StrictMode>

)
