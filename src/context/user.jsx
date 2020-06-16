import React, { createContext, useState } from 'react';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: undefined,
    username: undefined,
    profilePicture: undefined,
    role: undefined,
    jwt: undefined,
  });

  const signIn = async (user) => {
    console.log('user', user);
    throw new Error('Oops, something went wrong');
    // setUser((prevState) => ({
    //   ...prevState,
    //   userId: 12,
    //   username: 'quest1onmark',
    //   profilePicture: undefined,
    //   role: 'user',
    //   jwt: undefined,
    // }));
  };

  const signUp = () => {
    // TODO: add request
    setUser((prevState) => ({
      ...prevState,
      userId: 12,
      username: 'quest1onmark',
      profilePicture: undefined,
      role: 'user',
      jwt: undefined,
    }));
  };

  const signOut = () => {
    // TODO: add request
    setUser((prevState) => ({
      ...prevState,
      userId: undefined,
      username: undefined,
      profilePicture: undefined,
      role: undefined,
      jwt: undefined,
    }));
  };

  return <UserContext.Provider value={{ user, signIn, signUp, signOut }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
