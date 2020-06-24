import React, { createContext } from 'react';
import useAPI from '../api';

const APIContext = createContext();
const APIContextProvider = ({ children }) => {
  const { auth, user, profilePicture, comment, post } = useAPI();
  return <APIContext.Provider value={{ auth, user, profilePicture, comment, post }}>{children}</APIContext.Provider>;
};

export { APIContext, APIContextProvider };
