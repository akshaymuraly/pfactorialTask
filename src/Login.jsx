import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Moon, Sun, Calendar, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({isDarkMode,isLoggedIn,setIsLoggedIn,toggleTheme,themeClasses}) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle login
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    if (loginData.email === 'staff@clinic.com' && loginData.password === '123456') {
      localStorage.setItem('clinicAuth', 'true');
      setIsLoggedIn(true);
      navigate("/home")
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    if (loginError) setLoginError('');
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('clinicAuth');
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  return (
    <>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
              : 'bg-white hover:bg-gray-100 text-gray-700'
          } shadow-lg hover:shadow-xl`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className={`w-full max-w-md ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105`}>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-lg">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Clinic Calendar
            </h1>
            <p className={`text-sm mt-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Staff Login Portal
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="staff@clinic.com"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  } transition-colors`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            <div className={`${
              isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
            } rounded-lg p-4 border ${
              isDarkMode ? 'border-blue-800' : 'border-blue-200'
            }`}>
              <p className={`text-sm font-medium mb-1 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>
                Demo Credentials:
              </p>
              <p className={`text-xs ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Email: staff@clinic.com<br />
                Password: 123456
              </p>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
              } text-white transform hover:scale-105 active:scale-95`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className={`text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Secure staff access to appointment management
            </p>
          </div>
        </div>
      </div>
      </>   
  );
};

export default Login;