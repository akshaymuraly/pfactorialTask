import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom'
import Login from './Login'
import MainTheme from './MainTheme'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './Landing'

const App = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [isDarkMode,setIsDarkMode] = useState(false)
      useEffect(() => {
        const savedTheme = localStorage.getItem('clinicTheme');
        const savedAuth = localStorage.getItem('clinicAuth');
        
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
        
        if (savedAuth === 'true') {
          setIsLoggedIn(true);
        }
      }, []);
    
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('clinicTheme', newTheme ? 'dark' : 'light');
    };
      const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900';
    return (
            <Router>
                <Routes>
                    <Route element={<MainTheme themeClasses={themeClasses}/>}>
                        <Route path='/' element={<Login isLoggedIn={isLoggedIn} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoggedIn={setIsLoggedIn} toggleTheme={toggleTheme} themeClasses={themeClasses}/>}/>
                    </Route>
                     <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                          <Route path='/home' element={<Landing isDarkMode={isDarkMode} toggleTheme={toggleTheme} setIsLoggedIn={setIsLoggedIn}/>}/>
                        </Route>
                </Routes>
            </Router>
        )
}

export default App