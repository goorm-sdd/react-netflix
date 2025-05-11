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
      <div className="logo_box">
        <img
          src="./src/assets/logo.svg"
          alt="Netflix Logo"
          className="netflix_logo_category"
        />
      </div>
      <ul className="profiles">
        {profiles.map((profile, idx) => (
          <li key={idx} className="profile" onClick={onProfileSelect}>
            <img
              src={ProfileIcon}
              alt={profile.name}
              className={`profile_icon ${profile.color}`}
            />
            <p>{profile.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
