import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { APIContext } from './api';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const { auth, profilePicture } = useContext(APIContext);
  const [currentUser, setCurrentUser] = useState({
    userId: undefined,
    username: undefined,
    profilePicture: undefined,
    role: undefined,
    jwt: undefined,
  });

  let localStorageUser = localStorage.getItem('user');
  if (localStorageUser && currentUser.userId === undefined) {
    localStorageUser = JSON.parse(localStorageUser);
    setCurrentUser({
      userId: localStorageUser.userId,
      username: localStorageUser.username,
      profilePicture: localStorageUser.profilePicture,
      role: localStorageUser.role,
      jwt: localStorageUser.jwt,
    });
  }

  const signIn = async (username, password) => {
    const jwt = await auth.signIn(username, password);
    const pb = await profilePicture.getProfilePicture(jwt.userId);
    console.log('signIn -> pb', pb);
    setCurrentUser(() => {
      const state = { ...jwt, profilePicture: pb ? pb.content : undefined };
      localStorage.setItem('user', JSON.stringify(state));
      return state;
    });
    history.push('/');
  };

  const signUp = async (username, email, password, reenteredPassword) => {
    if (password === reenteredPassword) {
      const jwt = await auth.signUp(username, email, password);
      console.log('signUp -> jwt', jwt);
      setCurrentUser(() => {
        const state = { ...jwt };
        localStorage.setItem('user', JSON.stringify(state));
        return state;
      });
      history.push('/');
    } else {
      throw new Error('Passwords do not match.');
    }
  };

  const saveProfilePicture = async (userId, picture) => {
    const convertedImage = await profilePicture.setProfilePicture(userId, picture);

    setCurrentUser((prevState) => {
      const state = { ...prevState, profilePicture: convertedImage };
      localStorage.setItem('user', JSON.stringify(state));
      return state;
    });
  };

  const signOut = () => {
    setCurrentUser(() => {
      localStorage.removeItem('user');
      history.push('/');
      return {
        userId: undefined,
        username: undefined,
        profilePicture: undefined,
        role: undefined,
        jwt: undefined,
      };
    });
  };

  return <UserContext.Provider value={{ currentUser, signIn, signUp, signOut, saveProfilePicture }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
