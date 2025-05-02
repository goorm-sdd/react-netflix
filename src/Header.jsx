import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <button>
        <img
          src="./src/assets/netflix-icon.png"
          alt="Netflix"
          style={{ width: '40px' }}
        ></img>
      </button>
      <button>TV Shows</button>
      <button>Movies</button>
    </div>
  );
};

export default Header;
