import React from 'react';
import ProfileIcon from '../../assets/img-profile.svg';
import './Category.css';

const Category = ({ onProfileSelect }) => {
  const profiles = [
    { name: 'Emenalo', color: 'blue' },
    { name: 'Onyeka', color: 'yellow' },
    { name: 'Thelma', color: 'red' },
    { name: 'Sumdeep', color: 'green' },
  ];
  return (
    <div className="category_container">
      <img
        src="./src/assets/logo.svg"
        alt="Netflix Logo"
        className="netflix_logo_category"
      />
      <div className="profiles">
        {profiles.map((profile, idx) => (
          <div key={idx} className="profile" onClick={onProfileSelect}>
            <img
              src={ProfileIcon}
              alt={profile.name}
              className={`profile_icon ${profile.color}`}
            />
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
