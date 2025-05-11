import { Link } from 'react-router-dom';
import LogoIcon from '../../../assets/s-logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={LogoIcon} alt="Netflix" />
    </Link>
  );
};

export default Logo;
