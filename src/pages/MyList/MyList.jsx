import { useMyList } from './MyListContext';
import './MyList.css';

const MyList = () => {
  const { myList, removeFromMyList } = useMyList();

  return (
    <div className="mylist-page">
      {myList.length === 0 ? (
        <div className="empty-list">
          <p>Your list is empty. Add some movies or TV shows!</p>
        </div>
      ) : (
        <div className="mylist-grid">
          {myList.map((item) => (
            <div className="mylist-item" key={item.id}>
              <div className="poster-container">
                <img src={item.image} alt={item.title} className="poster" />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                  <button
                    className="remove-button"
                    onClick={() => removeFromMyList(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
