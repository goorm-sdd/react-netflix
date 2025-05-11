import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

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
  // Notifications처럼 드롭다운 메뉴가 필요 없는 경우 예외 처리
  const shouldShowDropdown = title !== 'Notifications';

  return (
    <>
      <div
        className="navigation"
        onClick={shouldShowDropdown ? toggleNavigation : undefined}
      >
        {title} {shouldShowDropdown && <span>▼</span>}
      </div>
      {isNavigationOpen && shouldShowDropdown && (
        <div className="navigation_menu">
          {items.map((item, index) => renderItem(item, index))}
          <button
            type="button"
            className="btn_close"
            onClick={toggleNavigation}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
