import React, { useState, useEffect } from 'react';
import { MyListContext } from './MyListContext';

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (content) => {
    if (!myList.some((item) => item.id === content.id)) {
      setMyList((prevList) => [...prevList, content]);
    }
  };

  const removeFromMyList = (contentId) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== contentId));
  };

  const isInMyList = (contentId) => {
    return myList.some((item) => item.id === contentId);
  };

  const value = {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList,
  };

  return (
    <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
  );
};
