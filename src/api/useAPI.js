import auth from './auth';
import user from './user';
import profilePicture from './profilePicture';
import comment from './comment';
import post from './post';

const useAPI = () => {
  return { auth, user, profilePicture, comment, post };
};

export default useAPI;
