import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ title, items }) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const renderItem = (item, index) => {
    if (typeof item === 'string') {
      const path = `/${item.toLowerCase().replace(' ', '-')}`;
      return (
        <Link to={path} key={index} onClick={toggleNavigation}>
          {item}
        </Link>
      );
    } else {
      return (
        <Link to={item.path} key={index} onClick={toggleNavigation}>
          {item.label}
        </Link>
      );
    }
  };

  return (
    <>
      <div className="navigation" onClick={toggleNavigation}>
        {title} <span>▼</span>
      </div>
      {isNavigationOpen && (
        <div className="navigation_menu">
          {items.map((item, index) => renderItem(item, index))}
          <div className="navigation_close" onClick={toggleNavigation}>
            ✕
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
