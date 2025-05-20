import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedMode = window.localStorage.getItem('mode')
      return savedMode === 'dark'
    }
    return false // 在伺服器端渲染時，預設使用 light 主題。
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const mode = isDarkMode ? 'dark' : 'light'
      document.documentElement.setAttribute('class', mode)
      window.localStorage.setItem('mode', mode)
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode)

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

const useDarkMode = () => useContext(DarkModeContext)

export { DarkModeContext, DarkModeProvider, useDarkMode }
