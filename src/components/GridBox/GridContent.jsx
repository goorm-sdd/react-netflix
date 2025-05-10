import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGridContentData } from '../../hooks/useGridContentData';
import DetailModal from '../DetailModal/DetailModal';

const GridContent = () => {
  const { mediaType, genreName } = useParams();
  const [page, setPage] = useState(1);
  const observer = useRef();

  const { items, loading } = useGridContentData(mediaType, genreName, page);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
    setIsOpen(true);
  };

  const lastItemElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  return (
    <>
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      {items.map((item, index) => {
        if (item.poster_path && index === items.length - 1) {
          return (
            <div ref={lastItemElementRef} key={item.id} className="grid_item">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() => openModal(item.id, item.media_type)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        } else if (item.poster_path) {
          return (
            <div key={item.id} className="grid_item">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() => openModal(item.id, item.media_type)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        }
        return null;
      })}
      {loading && <div>Loading...</div>}
    </>
  );
};

export default GridContent;
