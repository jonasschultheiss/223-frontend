import axios from '../axiosInstance';

const getLikes = async (imageId) => {
  const res = await axios.get(`/image/like/${imageId}`);
  return res;
};

export default getLikes;
