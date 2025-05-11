import { useMyList } from '../../context/MyListContext';
import MyListIcon from '../../assets/icon-mylist-plus.svg';
import ShareIcon from '../../assets/icon-share.svg';
import { useDetailData } from '../../hooks/useDetailData';
import './DetailModal.css';

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
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <img className="modal_poster" src={movie.image} alt={movie.title} />
        <div className="modal_detail">
          <div className="modal_buttons">
            <button
              type="button"
              className="btn_icon"
              onClick={handleMyListClick}
            >
              <img
                src={MyListIcon}
                alt="My List"
                className={`icon_image ${inMyList ? 'active' : ''}`}
              />
              <p>My List</p>
            </button>
            <button type="button" className="btn_icon">
              <img src={ShareIcon} alt="Share" className="icon_image" />
              <p>Share</p>
            </button>
          </div>
          <div className="modal_body">
            <p className="modal_subtitle">{movie.subtitle}</p>
            <h2 className="modal_title">{movie.title}</h2>
            <p className="modal_description">{movie.description}</p>
            <p className="modal_tags">{movie.tags}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
