import { useContext } from 'react';
import { MyListContext } from '../context/MyListContext.jsx';

export const useMyList = () => {
  return useContext(MyListContext);
};
