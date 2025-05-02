import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <button>
        <img
          src="./src/assets/home-icon.png"
          alt="home"
          style={{ width: '40px' }}
        ></img>
        <div>home</div>
      </button>
      <button>
        <img
          src="./src/assets/search-icon.png"
          alt="search"
          style={{ width: '40px' }}
        ></img>
        <div>Search</div>
      </button>
      <button>
        <img
          src="./src/assets/coming-soon-icon.png"
          alt="coming-soon"
          style={{ width: '40px' }}
        ></img>
        <div>Coming Soon</div>
      </button>
      <button>
        <img
          src="./src/assets/mylist-icon.png"
          alt="my-list"
          style={{ width: '40px' }}
        ></img>
        <div>My List</div>
      </button>
    </div>
  );
};

export default Footer;
