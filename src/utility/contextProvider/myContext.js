import { message } from 'antd';
import React, { createContext, useState, useEffect, useContext } from 'react';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { myLocalStorage } from '../localStorageWrapper';

export const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    favorites: [],
  });

  const [banksData, setBanksData] = useState({
    initialData: [],
    filteredData: [],
  });

  const addToFavorites = (bankObj) => {
    let favoriteBanks = [...get(userData, 'favorites'), bankObj];
    setUserData({ favorites: favoriteBanks });
    myLocalStorage.setItem(
      'favoriteBanks',
      JSON.stringify(favoriteBanks),
      12000000
    );
    message.success('Bank added to favorites.');
  };

  const removeFromFavorites = (ifsc) => {
    let newData = filter(
      get(userData, 'favorites'),
      (data) => data.ifsc !== ifsc
    );
    setUserData({
      favorites: newData,
    });
    myLocalStorage.setItem('favoriteBanks', JSON.stringify(newData), 12000000);
    message.success('Bank removed from favorites.');
  };

  useEffect(() => {
    let favoritesFromLocalStorage = myLocalStorage.getItem('favoriteBanks');
    if (favoritesFromLocalStorage) {
      setUserData({ favorites: JSON.parse(favoritesFromLocalStorage) });
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        userData,
        banksData,
        setBanksData,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
