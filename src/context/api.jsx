import React, { createContext } from 'react';
import useAPI from '../api';

const APIContext = createContext();
const APIContextProvider = ({ children }) => {
  console.log('APIContextProvider -> useAPI()', useAPI());
  const { auth, user, profilePicture, comment } = useAPI();
  return <APIContext.Provider value={{ auth, user, profilePicture, comment }}>{children}</APIContext.Provider>;
};

export { APIContext, APIContextProvider };
