import React, { useState } from 'react';
import { useMyList } from '../../context/MyListContext';
import DetailModal from '../../components/DetailModal/DetailModal';
import './MyList.css';

const MyList = () => {
  const { myList, removeFromMyList } = useMyList();

  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
    setIsOpen(true);
  };

  return (
    <div className="mylist-page">
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      {myList.length === 0 ? (
        <div className="empty-list">
          <p>Your list is empty. Add some movies or TV shows!</p>
        </div>
      ) : (
        <div className="mylist-grid">
          {myList.map((item) => (
            <div className="mylist-item" key={item.id}>
              <div
                className="poster-container"
                onClick={() => openModal(item.id, item.media_type)}
              >
                <img src={item.image} alt={item.title} className="poster" />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                  <button
                    className="remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromMyList(item.id);
                    }}
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
