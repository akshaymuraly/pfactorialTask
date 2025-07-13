import React, { useState } from 'react';
import { Calendar, Plus, Clock, LogOut, Settings, User, Bell, Menu, X , Sun, Moon} from 'lucide-react';
import AppointmentCalendar from './components/AppoinmentCalendar';
import Appoinments from './components/Appoinments';

const Landing = ({isDarkMode,toggleTheme,setIsLoggedIn}) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];


  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <Appoinments isDarkMode={isDarkMode}/>
      case 'calendar':
        return <AppointmentCalendar isDarkMode={isDarkMode}/>
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white/80 backdrop-blur-md border-gray-200'
        } border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode
                  ? 'bg-indigo-600'
                  : 'bg-gradient-to-br from-indigo-500 to-blue-600'
                }`}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Clinic Dashboard
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  Appointment Management
                </p>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
                  }`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Desktop Controls */}
              <div className="hidden lg:flex items-center space-x-4">
                <button
                          onClick={toggleTheme}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                              : 'bg-white hover:bg-gray-100 text-gray-700'
                          } shadow-lg hover:shadow-xl`}
                        >
                          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-gradient-to-br from-indigo-500 to-blue-600'
                    }`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={()=>setIsLoggedIn(prev=>!prev)}
                  className={`p-2 rounded-lg hover:bg-red-50 transition-colors ${isDarkMode
                      ? 'hover:bg-red-900/20 text-red-400'
                      : 'text-red-600 hover:text-red-700'
                    }`}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className={`fixed top-0 right-0 h-full w-72 ${isDarkMode
                ? 'bg-gray-800'
                : 'bg-white'
              } shadow-2xl transform transition-transform duration-300 ease-in-out`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                } shadow-lg hover:shadow-xl`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col h-full pt-16">
              {/* Navigation */}
              <nav className="flex-1 px-6 py-6">
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? isDarkMode
                              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                              : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md'
                            : isDarkMode
                              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                              : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${
                          activeTab === tab.id
                            ? 'bg-white/20'
                            : isDarkMode
                              ? 'bg-gray-600'
                              : 'bg-gray-100'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom Controls */}
              <div className="p-6 space-y-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${
                    isDarkMode ? 'bg-yellow-500/20' : 'bg-indigo-100'
                  }`}>
                    {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
                  </div>
                  <span className="font-medium text-sm">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={()=>setIsLoggedIn(prev=>!prev)}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400 hover:text-red-300'
                      : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${
                    isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
                  }`}>
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Sidebar - Desktop Only */}
          <div className="hidden lg:block w-full lg:w-64 shrink-0">
            <nav className={`${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-4`}>
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeTab === tab.id
                          ? isDarkMode
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg'
                          : isDarkMode
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Quick Stats */}
            <div className={`mt-6 ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-4`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    Today's Appointments
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    12
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    This Week
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    47
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    Available Slots
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    8
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 rounded-lg">
            <div className={`${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border min-h-96 mb-16 lg:mb-0`}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className={`${isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          } border-t px-4 py-2 shadow-lg`}>
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${activeTab === tab.id
                      ? isDarkMode
                        ? 'text-indigo-400 bg-indigo-900/20'
                        : 'text-indigo-600 bg-indigo-50'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-700'
                    }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;