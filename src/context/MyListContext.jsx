import { createContext, useState, useEffect, useContext } from 'react';

export const MyListContext = createContext();

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
      setMyList((prevList) => {
        const updatedList = [...prevList, content];
        localStorage.setItem('myList', JSON.stringify(updatedList));
        return updatedList;
      });
    }
  };
  const removeFromMyList = (contentId) => {
    setMyList((prevList) => {
      const updatedList = prevList.filter((movie) => movie.id !== contentId);
      localStorage.setItem('myList', JSON.stringify(updatedList));
      return updatedList;
    });
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

export const useMyList = () => {
  return useContext(MyListContext);
};
