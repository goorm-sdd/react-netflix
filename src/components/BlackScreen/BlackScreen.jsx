import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderItem = (item, index) => {
    if (typeof item === 'string') {
      const path = `/${item.toLowerCase().replace(' ', '-')}`;
      return (
        <Link to={path} key={index} onClick={toggleDropdown}>
          {item}
        </Link>
      );
    } else {
      return (
        <Link to={item.path} key={index} onClick={toggleDropdown}>
          {item.label}
        </Link>
      );
    }
  };

  return (
    <>
      <div className="Dropdown" onClick={toggleDropdown}>
        {title} <span>▼</span>
      </div>
      {isDropdownOpen && (
        <div className="Dropdown-menu">
          {items.map((item, index) => renderItem(item, index))}
          <div className="Dropdown-close" onClick={toggleDropdown}>
            ✕
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
