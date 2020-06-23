import axios from '../axiosInstance';

const getAllUsers = async () => {
  const users = await axios.get('/user');
  return users;
};

export default getAllUsers;
