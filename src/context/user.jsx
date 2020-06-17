import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    userId: undefined,
    username: undefined,
    profilePicture: undefined,
    role: undefined,
    jwt: undefined,
  });

  let localStorageUser = localStorage.getItem('user');
  if (localStorageUser && user.userId === undefined) {
    console.log(user);
    localStorageUser = JSON.parse(localStorageUser);
    setUser({
      userId: localStorageUser.userId,
      username: localStorageUser.username,
      profilePicture: localStorageUser.profilePicture,
      role: localStorageUser.role,
      jwt: localStorageUser.jwt,
    });
  }
  const signIn = async (userObj) => {
    const { username, password } = userObj;
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { username, password },
    });
    const jwt = JSON.parse(atob(res.data.access_token.split('.')[1]));
    setUser(() => {
      const state = {
        userId: jwt.userId,
        username: jwt.username,
        profilePicture: jwt.profilePicture,
        role: jwt.role,
        jwt: res.data.access_token,
      };
      localStorage.setItem('user', JSON.stringify(state));
      return state;
    });
    history.push('/');
  };

  const signUp = async (userObj) => {
    const { username, password, reenteredPassword } = userObj;
    if (password === reenteredPassword) {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/user',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { username, password },
      });
      const jwt = JSON.parse(atob(res.data.access_token.split('.')[1]));
      console.log('res', jwt);
      setUser(() => {
        const state = {
          userId: jwt.userId,
          username: jwt.username,
          profilePicture: jwt.profilePicture,
          role: res.data.access_token,
          jwt: jwt,
        };
        localStorage.setItem('user', JSON.stringify(state));
        return state;
      });
      history.push('/');
    } else {
      throw new Error('Passwords do not match.');
    }
  };

  const saveProfilePicture = async (userId, profilePicture) => {
    const convertedPicture = await toBase64(profilePicture);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/user/profilePicture',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { user: userId, content: convertedPicture },
    });

    console.log('res', res);

    setUser((prevState) => {
      const state = { ...prevState, profilePicture: convertedPicture };
      localStorage.setItem('user', JSON.stringify(state));
      return state;
    });
  };

  const signOut = () => {
    setUser({
      userId: undefined,
      username: undefined,
      profilePicture: undefined,
      role: undefined,
      jwt: undefined,
    });

    localStorage.removeItem('user');
    history.push('/');
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return <UserContext.Provider value={{ user, signIn, signUp, signOut, saveProfilePicture }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
