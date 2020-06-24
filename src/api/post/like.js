import axios from '../axiosInstance';

const like = async (userId, postId) => {
  const res = await axios.post(`/image/like`, { imageId: postId, userId });
  return res;
};

export default like;
