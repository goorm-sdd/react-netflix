import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <button>
        <img
          src="./src/assets/home-icon.png"
          alt="home"
          className="footer-icon"
        ></img>
        <div>home</div>
      </button>
      <button>
        <img
          src="./src/assets/search-icon.png"
          alt="search"
          className="footer-icon"
        ></img>
        <div>Search</div>
      </button>
      <button>
        <img
          src="./src/assets/coming-soon-icon.png"
          alt="coming-soon"
          className="footer-icon"
        ></img>
        <div>Coming Soon</div>
      </button>
      <button>
        <img
          src="./src/assets/mylist-icon.png"
          alt="my-list"
          className="footer-icon"
        ></img>
        <div>My List</div>
      </button>
    </div>
  );
};

export default Footer;
