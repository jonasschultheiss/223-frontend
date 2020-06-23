import auth from './auth';
import user from './user';
import profilePicture from './profilePicture';
import comment from './comment';

const useAPI = () => {
  return { auth, user, profilePicture, comment };
};

export default useAPI;
