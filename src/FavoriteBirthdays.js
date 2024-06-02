import React from 'react';
import { FaStar } from 'react-icons/fa';

const FavoriteBirthdays = ({ favorites }) => {
  return (
    <div>
      <h2>Favorite Birthdays</h2>
      {Object.keys(favorites).length > 0 ? (
        Object.keys(favorites).map(date => (
          <div key={date}>
            <h3>{date}</h3>
            <ul className="favorite-birthday-list">
              {favorites[date].map((birthday, index) => (
                <li key={index}>
                  <FaStar className="star-icon favorite" />
                  {birthday}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No favorite birthdays.</p>
      )}
    </div>
  );
};

export default FavoriteBirthdays;
