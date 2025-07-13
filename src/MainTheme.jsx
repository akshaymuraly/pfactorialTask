import React from 'react'
import { Outlet } from 'react-router-dom'

const MainTheme = ({themeClasses}) => {
  return (
        <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
            <Outlet/>
        </div>
  )
}

export default MainTheme