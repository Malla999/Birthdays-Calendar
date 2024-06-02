import React, { useState } from 'react';
import Calendar from './Calendar';
import BirthdayList from './BirthdayList';
import FavoriteBirthdays from './FavoriteBirthdays';
import './App.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [favorites, setFavorites] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleFavorite = (date, birthday) => {
    const dateKey = date.toLocaleString('default', { month: 'long', day: 'numeric' });
    const newFavorites = { ...favorites };

    if (!newFavorites[dateKey]) {
      newFavorites[dateKey] = [];
    }

    const index = newFavorites[dateKey].indexOf(birthday);
    if (index === -1) {
      newFavorites[dateKey].push(birthday);
    } else {
      newFavorites[dateKey].splice(index, 1);
    }

    if (newFavorites[dateKey].length === 0) {
      delete newFavorites[dateKey];
    }

    setFavorites(newFavorites);
  };

  return (
    <div className="app-container">
      <h1>Birthday Calendar</h1>
      <div className="main-content">
        <div className="left-panel">
          <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
          <BirthdayList selectedDate={selectedDate} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
        <div className="right-panel">
          <FavoriteBirthdays favorites={favorites} />
        </div>
      </div>
    </div>
  );
};

export default App;
