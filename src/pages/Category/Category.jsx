import React from 'react';
import './Category.css';

const Category = ({ onProfileSelect }) => {
  const profiles = [
    { name: 'Emenalo', image: './src/assets/netflix-profile-blue.svg' },
    { name: 'Onyeka', image: './src/assets/netflix-profile-yellow.svg' },
    { name: 'Thelma', image: './src/assets/netflix-profile-red.svg' },
    { name: 'Sumdeep', image: './src/assets/netflix-profile-green.svg' },
  ];
  return (
    <div className="category-container">
      <img
        src="./src/assets/netflix-logo-icon.svg"
        alt="Netflix Logo"
        className="netflix-logo-category"
      />
      <div className="profiles">
        {profiles.map((profile, idx) => (
          <div key={idx} className="profile" onClick={onProfileSelect}>
            <img src={profile.image} alt={profile.name} />
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
