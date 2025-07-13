import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, X, Calendar, Clock } from 'lucide-react';

const AppointmentCalendar = ({ isDarkMode = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSelectedDate, setMobileSelectedDate] = useState(new Date());

  // Mock data
  const patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Alice Brown' },
    { id: 5, name: 'Charlie Wilson' },
    { id: 6, name: 'Diana Davis' },
    { id: 7, name: 'Eva Martinez' },
    { id: 8, name: 'Frank Miller' },
    { id: 9, name: 'Grace Taylor' },
    { id: 10, name: 'Henry Anderson' },
    { id: 11, name: 'Ivy Thomas' },
    { id: 12, name: 'Jack White' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Johnson' },
    { id: 3, name: 'Dr. Brown' },
    { id: 4, name: 'Dr. Davis' },
    { id: 5, name: 'Dr. Wilson' }
  ];

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    time: '',
    date: ''
  });

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load appointments from memory (sample data)
  useEffect(() => {
    // Sample appointments for demo with multiple appointments on same day
    const sampleAppointments = [
      {
        id: 1,
        patientId: 1,
        doctorId: 1,
        date: new Date().toISOString().split('T')[0],
        time: '09:00'
      },
      {
        id: 2,
        patientId: 2,
        doctorId: 2,
        date: new Date().toISOString().split('T')[0],
        time: '10:30'
      },
      {
        id: 3,
        patientId: 3,
        doctorId: 1,
        date: new Date().toISOString().split('T')[0],
        time: '11:00'
      },
      {
        id: 4,
        patientId: 4,
        doctorId: 3,
        date: new Date().toISOString().split('T')[0],
        time: '14:00'
      },
      {
        id: 5,
        patientId: 5,
        doctorId: 2,
        date: new Date().toISOString().split('T')[0],
        time: '15:30'
      },
      {
        id: 6,
        patientId: 6,
        doctorId: 4,
        date: new Date().toISOString().split('T')[0],
        time: '16:00'
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month (blank days)
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the current month only
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    // Fill remaining cells with previous/next month days (greyed out)
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startingDayOfWeek + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      const nextMonthDay = new Date(year, month + 1, day);
      days.push({ date: nextMonthDay, isAdjacentMonth: true });
    }

    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date || typeof date !== 'object' || date.isAdjacentMonth) return [];
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const handleDateClick = (date) => {
    // Don't allow clicking on blank days, adjacent month days, or past dates
    if (!date || typeof date !== 'object' || date.isAdjacentMonth) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) return;

    setSelectedDate(date);
    setShowForm(true);
    setEditingAppointment(null);
    setFormData({
      patientId: '',
      doctorId: '',
      time: '',
      date: date.toISOString().split('T')[0]
    });
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();

    if (!formData.patientId || !formData.doctorId || !formData.time) {
      alert('Please fill in all fields');
      return;
    }

    const newAppointment = {
      id: editingAppointment ? editingAppointment.id : Date.now(),
      patientId: parseInt(formData.patientId),
      doctorId: parseInt(formData.doctorId),
      time: formData.time,
      date: formData.date
    };

    if (editingAppointment) {
      setAppointments(prev =>
        prev.map(apt => apt.id === editingAppointment.id ? newAppointment : apt)
      );
    } else {
      setAppointments(prev => [...prev, newAppointment]);
    }

    setShowForm(false);
    setEditingAppointment(null);
    setFormData({ patientId: '', doctorId: '', time: '', date: '' });
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientId: appointment.patientId.toString(),
      doctorId: appointment.doctorId.toString(),
      time: appointment.time,
      date: appointment.date
    });
    setShowForm(true);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  // Mobile Day View
  const renderMobileDayView = () => {
    const dayAppointments = getAppointmentsForDate(mobileSelectedDate);

    // Get current month date range
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    return (
      <div className="p-3">
        {/* Date Picker */}
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Select Date
          </label>
          <input
            type="date"
            value={mobileSelectedDate.toISOString().split('T')[0]}
            onChange={(e) => setMobileSelectedDate(new Date(e.target.value))}
            min={firstDayOfMonth.toISOString().split('T')[0]}
            max={lastDayOfMonth.toISOString().split('T')[0]}
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          />
        </div>

        {/* Selected Date Display */}
        <div className={`p-3 rounded-lg mb-3 ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-50 border border-blue-200'}`}>
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            {formatDate(mobileSelectedDate)}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
            {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Add Appointment Button */}
        <button
          onClick={() => handleDateClick(mobileSelectedDate)}
          disabled={mobileSelectedDate < new Date().setHours(0, 0, 0, 0)}
          className={`w-full mb-3 p-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${mobileSelectedDate < new Date().setHours(0, 0, 0, 0)
              ? isDarkMode
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-gray-400 cursor-not-allowed text-gray-200'
              : isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Appointment</span>
        </button>

        {/* Appointments List - Fixed min-height */}
        <div className="min-h-[200px] max-h-80 overflow-y-auto space-y-2">
          {dayAppointments.length === 0 ? (
            <div className={`p-3 text-center rounded-lg ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                No appointments for this date
              </p>
            </div>
          ) : (
            dayAppointments.map(appointment => (
              <div
                key={appointment.id}
                className={`p-3 rounded-lg border transition-colors ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                  } shadow-sm`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {getPatientName(appointment.patientId)}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {getDoctorName(appointment.doctorId)}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className={`w-4 h-4 mr-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className={`p-1 rounded-lg transition-colors ${isDarkMode
                          ? 'hover:bg-gray-600 text-gray-300 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                        }`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className={`p-1 rounded-lg transition-colors ${isDarkMode
                          ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300'
                          : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                        }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Desktop Month View
  const renderDesktopMonthView = () => {
    // Force current month only
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthDate = new Date(currentYear, currentMonth, 1);

    const days = getDaysInMonth(currentMonthDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="p-4">
        {/* Month Navigation - Disabled */}
        <div className="flex items-center justify-between mb-4">
          <button
            disabled
            className={`p-2 rounded-lg opacity-50 cursor-not-allowed ${isDarkMode
                ? 'text-gray-500 bg-gray-700'
                : 'text-gray-400 bg-gray-100'
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {currentMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>

          <button
            disabled
            className={`p-2 rounded-lg opacity-50 cursor-not-allowed ${isDarkMode
                ? 'text-gray-500 bg-gray-700'
                : 'text-gray-400 bg-gray-100'
              }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {dayNames.map(day => (
            <div
              key={day}
              className={`p-2 text-center text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => {
            // Handle blank days (before month starts)
            if (!day) {
              return (
                <div
                  key={index}
                  className={`p-2 h-32 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                ></div>
              );
            }

            // Handle adjacent month days (greyed out, not interactive)
            if (day.isAdjacentMonth) {
              return (
                <div
                  key={`adjacent-${index}`}
                  className={`p-2 h-32 border ${isDarkMode
                      ? 'border-gray-700 bg-gray-800'
                      : 'border-gray-100 bg-gray-50'
                    }`}
                >
                  <span className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                    {day.date.getDate()}
                  </span>
                </div>
              );
            }

            // Handle current month days
            const dayAppointments = getAppointmentsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isPastDate = day < new Date().setHours(0, 0, 0, 0);

            return (
              <div
                key={day.toISOString()}
                onClick={() => !isPastDate && handleDateClick(day)}
                className={`p-2 h-32 border transition-colors ${isDarkMode
                    ? 'border-gray-600'
                    : 'border-gray-200'
                  } ${isPastDate
                    ? 'cursor-not-allowed opacity-50'
                    : isDarkMode
                      ? 'cursor-pointer hover:bg-gray-700 hover:border-gray-500'
                      : 'cursor-pointer hover:bg-gray-50 hover:border-gray-300'
                  } ${isToday ?
                    isDarkMode
                      ? 'bg-blue-900/30 border-blue-500'
                      : 'bg-blue-50 border-blue-200'
                    : isDarkMode
                      ? 'bg-gray-800'
                      : 'bg-white'
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-semibold ${isPastDate
                      ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                      : isToday
                        ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        : isDarkMode
                          ? 'text-white'
                          : 'text-gray-900'
                    }`}>
                    {day.getDate()}
                  </span>
                  {dayAppointments.length > 0 && (
                    <span className={`text-xs px-1 py-0.5 rounded-full font-medium ${isPastDate
                        ? isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'
                        : isDarkMode
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                      {dayAppointments.length}
                    </span>
                  )}
                </div>

                {/* Appointments Preview - Fixed container height with min-height */}
                <div
                  className={`min-h-[80px] space-y-1 ${isPastDate ? 'opacity-60' : ''
                    }`}
                  style={{
                    height: '80px',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  <style>{`
                    .appointment-scroll::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {dayAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className={`text-xs p-1 rounded truncate ${isPastDate
                          ? isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-500'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        } transition-colors cursor-pointer`}
                      title={`${appointment.time} - ${getPatientName(appointment.patientId)} with ${getDoctorName(appointment.doctorId)}`}
                    >
                      <div className="font-medium">{appointment.time}</div>
                      <div className="truncate">{getPatientName(appointment.patientId)}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Main Calendar - Reduced max width */}
      <div className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-lg`}>
        {isMobile ? renderMobileDayView() : renderDesktopMonthView()}
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className={`p-1 rounded-lg transition-colors ${isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                  }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div onSubmit={handleFormSubmit} className="p-4">
              <div className="space-y-4">
                {/* Date Display */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                    Date
                  </label>
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-50 text-gray-900'
                    }`}>
                    {new Date(formData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Patient Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                    Patient
                  </label>
                  <select
                    value={formData.patientId}
                    onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    required
                  >
                    <option value="">Select a patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                    Doctor
                  </label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    required
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${isDarkMode
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {editingAppointment ? 'Update' : 'Add'} Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;