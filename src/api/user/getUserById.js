import axios from '../axiosInstance';

const getUserById = async (userId) => {
  const users = await axios.get(`/user/${userId}`);
  return users;
};

export default getUserById;
