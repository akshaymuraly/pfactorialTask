import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Filter, Trash2, X } from 'lucide-react';

const Appointments = ({ isDarkMode }) => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      doctor: 'Dr. Sarah Wilson',
      date: '2025-07-12',
      time: '09:00',
      duration: '30 min'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      doctor: 'Dr. Michael Johnson',
      date: '2025-07-12',
      time: '10:30',
      duration: '45 min'
    },
    {
      id: 3,
      patient: 'Bob Johnson',
      doctor: 'Dr. Sarah Wilson',
      date: '2025-07-13',
      time: '14:00',
      duration: '60 min'
    },
    {
      id: 4,
      patient: 'Alice Brown',
      doctor: 'Dr. Emily Davis',
      date: '2025-07-13',
      time: '11:00',
      duration: '30 min'
    },
    {
      id: 5,
      patient: 'Charlie Wilson',
      doctor: 'Dr. Michael Johnson',
      date: '2025-07-14',
      time: '15:30',
      duration: '45 min'
    },
    {
      id: 6,
      patient: 'Diana Lee',
      doctor: 'Dr. Emily Davis',
      date: '2025-07-15',
      time: '09:30',
      duration: '30 min'
    }
  ]);

  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Get unique doctors and patients for filter dropdowns
  const doctors = [...new Set(appointments.map(apt => apt.doctor))];
  const patients = [...new Set(appointments.map(apt => apt.patient))];

  // Filter appointments based on doctor and patient criteria
  useEffect(() => {
    let filtered = appointments;

    // Doctor filter
    if (filterDoctor) {
      filtered = filtered.filter(apt => apt.doctor === filterDoctor);
    }

    // Patient filter
    if (filterPatient) {
      filtered = filtered.filter(apt => apt.patient === filterPatient);
    }

    setFilteredAppointments(filtered);
  }, [appointments, filterDoctor, filterPatient]);

  // Delete appointment
  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    setDeleteConfirm(null);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterDoctor('');
    setFilterPatient('');
    setShowFilters(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Appointments
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and view all appointments
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`mb-6 rounded-lg p-4 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        {/* Filter Controls */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by Doctor
              </label>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="">All Doctors</option>
                {doctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by Patient
              </label>
              <select
                value={filterPatient}
                onChange={(e) => setFilterPatient(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="">All Patients</option>
                {patients.map(patient => (
                  <option key={patient} value={patient}>{patient}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Clear Filters Button */}
        {(filterDoctor || filterPatient) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className={`flex items-center px-3 py-1 text-sm rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <X className="w-3 h-3 mr-1" />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </p>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className={`text-center py-12 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <Calendar className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
              No appointments found
            </p>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`border rounded-lg p-4 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
                      <User className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {appointment.patient}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        with {appointment.doctor}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {formatDate(appointment.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => setDeleteConfirm(appointment.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300' 
                        : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                    }`}
                    title="Delete appointment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg p-6 max-w-sm w-full border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Confirm Delete
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAppointment(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;