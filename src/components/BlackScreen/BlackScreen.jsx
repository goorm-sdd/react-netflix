import { useState } from 'react';

const Dropdown = ({ title, items }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="Dropdown" onClick={toggleDropdown}>
        {title} <span>▼</span>
      </div>
      {isDropdownOpen && (
        <div className="Dropdown-menu">
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <div className="Dropdown-close" onClick={toggleDropdown}>
            ✕
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
