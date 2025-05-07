import { useContext } from 'react';
import { MyListContext } from './MyListContext';

export const useMyList = () => {
  return useContext(MyListContext);
};
