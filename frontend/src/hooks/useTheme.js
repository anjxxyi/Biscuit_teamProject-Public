import { useCallback, useState } from 'react'

export default function useTheme() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = useCallback(() => {
    setDarkMode((enabled) => !enabled)
  }, [])

  return { darkMode, toggleDarkMode }
}
