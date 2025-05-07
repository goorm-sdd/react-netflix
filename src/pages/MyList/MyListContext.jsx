import { createContext, useState, useEffect } from 'react';

const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie) => {
    if (!myList.some((item) => item.id === movie.id)) {
      setMyList((prevList) => {
        const updatedList = [...prevList, movie];
        localStorage.setItem('myList', JSON.stringify(updatedList));
        return updatedList;
      });
    }
  };
  const removeFromMyList = (movieId) => {
    setMyList((prevList) => {
      const updatedList = prevList.filter((movie) => movie.id !== movieId);
      localStorage.setItem('myList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const isInMyList = (movieId) => {
    return myList.some((item) => item.id === movieId);
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
