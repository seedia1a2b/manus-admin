import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContentProvider from './context/ContentProvider'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContentProvider>
      <App />
    </ContentProvider>
  </BrowserRouter>,
)
