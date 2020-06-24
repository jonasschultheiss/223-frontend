import axios from '../axiosInstance';

const unlike = async (userId, postId) => {
  const res = await axios.delete(`/image/like`, { data: { imageId: postId, userId } });
  return res;
};

export default unlike;
