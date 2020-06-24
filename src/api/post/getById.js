import axios from '../axiosInstance';

const getById = async (imageId) => {
  const res = await axios.get(`/image/${imageId}`);
  return res;
};

export default getById;
