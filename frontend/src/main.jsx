import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import ScrollTop from './components/style/ScrollTop'

import './static/fonts/pretendard.css'
import './styles/reset.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollTop />
      <App />
    </BrowserRouter>
  // </React.StrictMode>
)
