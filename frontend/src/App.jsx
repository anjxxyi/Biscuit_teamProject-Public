import { useState } from 'react'

import AppRoutes from './app/AppRoutes'
import AuthProvider from './app/AuthProvider'
import Layout from './components/Layout'
import './styles/reset.css'
import './styles/common.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const handleDarkMode = () => setDarkMode((enabled) => !enabled)

  return (
    <AuthProvider>
      <Layout darkMode={darkMode} handleDarkMode={handleDarkMode}>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  )
}

export default App
