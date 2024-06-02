import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const BirthdayList = ({ selectedDate, favorites, onToggleFavorite }) => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBirthdays = async () => {
      setLoading(true);
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const language = 'en';
      const type = 'births';

      try {
        const response = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/${type}/${month}/${day}`);
        setBirthdays(response.data.births.map((birthday, index) => ({ ...birthday, id: `${month}-${day}-${index}` })));
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, [selectedDate]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBirthdays = birthdays.filter(birthday =>
    birthday.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formattedDate = selectedDate.toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <div>
      <h2>Birthdays on {formattedDate}</h2>
      <input
        type="text"
        placeholder="Search birthdays..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="birthday-list">
          {filteredBirthdays.length > 0 ? (
            filteredBirthdays.map(birthday => (
              <li key={birthday.id} className={favorites[formattedDate]?.includes(birthday.text) ? 'favorite' : ''}>
                <FaStar
                  className={`star-icon ${favorites[formattedDate]?.includes(birthday.text) ? 'favorite' : ''}`}
                  onClick={() => onToggleFavorite(selectedDate, birthday.text)}
                />
                {birthday.text}
              </li>
            ))
          ) : (
            <p>No birthdays found for this date.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default BirthdayList;
