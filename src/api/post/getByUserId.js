import axios from '../axiosInstance';

const getByUserId = async (userId) => {
  const res = await axios.get(`/image/user/${userId}`);
  return res;
};

export default getByUserId;
