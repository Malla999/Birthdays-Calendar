import React, { useState, useEffect } from 'react';
import './App.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartingDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = daysInMonth(year, month);
    const startingDay = getStartingDayOfMonth(year, month);

    const blanks = [];
    for (let i = 0; i < startingDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="calendar-day empty"></div>);
    }

    const days = [];
    for (let day = 1; day <= numDays; day++) {
      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear() ? 'selected' : ''}`}
          onClick={() => onDateChange(new Date(year, month, day))}
        >
          {day}
        </div>
      );
    }

    const totalSlots = [...blanks, ...days];
    const rows = [];
    let cells = [];

    totalSlots.forEach((slot, i) => {
      if (i % 7 !== 0) {
        cells.push(slot);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(slot);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, i) => {
      return <div key={`row-${i}`} className="calendar-row">{row}</div>;
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h1>{months[date.getMonth()]} {date.getFullYear()}</h1>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-body">
        <div className="calendar-row">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
        </div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
