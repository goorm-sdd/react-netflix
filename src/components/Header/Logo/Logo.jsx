import { Link } from 'react-router-dom';
import './Logo.css';
import LogoIcon from '../../../assets/s-logo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoIcon} alt="Netflix" className="Logo" />
    </Link>
  );
};

export default Logo;
