import axios from '../axiosInstance';

const getAllFromUser = async (jwt, userId) => {
  const res = await axios.get(`/comment/${userId}`);
  return res;
};

export default getAllFromUser;
