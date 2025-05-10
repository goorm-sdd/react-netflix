import './DetailModal.css';
import { useMyList } from '../../context/MyListContext';
import MyListIcon from '../../assets/icon-mylist-plus.svg';
import ShareIcon from '../../assets/icon-share.svg';
import { useDetailData } from '../../hooks/useDetailData';

const DetailModal = ({ isOpen, onClose, movieId, movieType }) => {
  const movie = useDetailData(isOpen, movieId, movieType);
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  const inMyList = movieId ? isInMyList(movieId) : false;

  const handleMyListClick = () => {
    if (!movie) return;

    if (inMyList) {
      removeFromMyList(movieId);
    } else {
      addToMyList({
        id: movieId,
        title: movie.title,
        image: movie.image,
        media_type: movieType,
      });
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-poster" src={movie.image} alt={movie.title} />
        <div className="modal-detail">
          <div className="modal-buttons">
            <div className="icon-button" onClick={handleMyListClick}>
              <img
                src={MyListIcon}
                alt="My List"
                className={`icon-image ${inMyList ? 'active' : ''}`}
              />
              <p>My List</p>
            </div>
            <div className="icon-button">
              <img src={ShareIcon} alt="Share" className="icon-image" />
              <p>Share</p>
            </div>
          </div>
          <div className="modal-body">
            <p className="modal-subtitle">{movie.subtitle}</p>
            <h2 className="modal-title">{movie.title}</h2>
            <p className="modal-description">{movie.description}</p>
            <p className="modal-tags">{movie.tags}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
