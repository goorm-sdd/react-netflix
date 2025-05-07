import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/">
      <img src="./src/assets/netflix-icon.png" alt="Netflix" className="Logo" />
    </Link>
  );
};

export default Logo;
