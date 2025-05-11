import { Link } from 'react-router-dom';
import LogoIcon from '../../../assets/s-logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoIcon} alt="Netflix" className="logo" />
    </Link>
  );
};

export default Logo;
