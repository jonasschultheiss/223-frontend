import axios from '../axiosInstance';

const getAll = async (pageNumber) => {
  const res = await axios.get(`/image?page=${pageNumber}`);
  return res;
};

export default getAll;
