/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [calendarDates, setCalendarDates] = useState([]);
  
  useEffect(() => {
    generateCalendarDates();
  }, [selectedDate]);

  const generateCalendarDates = () => {
    const dates = [];
    const currentDate = new Date();
    currentDate.setDate(1); 
    
    const firstDayIndex = currentDate.getDay();
    
    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }
    
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    
    for (let i = 1; i <= lastDay; i++) {
      dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    
    setCalendarDates(dates);
  };

  const handleDateClick = (date) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div className="w-full bg-bluemain rounded-lg p-2 my-3">
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm p-1 text-white font-bold">
            {day}
          </div>
        ))}
        {calendarDates.map((date, index) => (
          <div
            key={index}
            onClick={() => date && handleDateClick(date)}
            className={`
              text-center p-1 cursor-pointer rounded
              ${!date ? 'bg-transparent' : 'bg-white text-blue-500 hover:bg-blue-100'}
              ${date && selectedDate && date.toDateString() === selectedDate.toDateString() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : ''}
            `}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;