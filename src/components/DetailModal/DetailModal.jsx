import './detail-modal.css';
import MyListIcon from '../../assets/modal-mylist-icon.png';
import ShareIcon from '../../assets/modal-share-icon.png';

export default function DetailModal({ isOpen, onClose, movie }) {
  if (!isOpen || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-poster" src={movie.image} alt={movie.title} />

        <div className="modal-buttons">
          <div className="icon-button">
            <img src={MyListIcon} alt="My List" className="icon-image" />
            <p>My List</p>
          </div>
          <div className="icon-button">
            <img src={ShareIcon} alt="Share" className="icon-image" />
            <p>Share</p>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">Season 1 Coming December 14</p>
          <h2 className="modal-title">{movie.title}</h2>
          <p className="modal-description">{movie.description}</p>
          <p className="modal-tags">{movie.tags}</p>
        </div>
      </div>
    </div>
  );
}
