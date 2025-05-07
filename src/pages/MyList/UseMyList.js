import { createContext, useContext } from 'react';

const MyListContext = createContext();

export const useMyList = () => {
  return useContext(MyListContext);
};
