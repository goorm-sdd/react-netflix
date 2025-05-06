import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

const MyList = () => {
  return (
    <div className="MyList">
      <Header />
      <h1>My List</h1>
      <div className="content">
        <p>My List is empty</p>
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
