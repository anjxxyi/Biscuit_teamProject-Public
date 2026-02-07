import AppRoutes from './app/AppRoutes'
import AuthProvider from './app/AuthProvider'
import Layout from './components/Layout'
import useTheme from './hooks/useTheme'
import './styles/reset.css'
import './styles/common.css'

function App() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <AuthProvider>
      <Layout darkMode={darkMode} handleDarkMode={toggleDarkMode}>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  )
}

export default App
