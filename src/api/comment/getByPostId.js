import axios from '../axiosInstance';

const getByPostId = async (postId) => {
  const res = await axios.get(`/comment/post/${postId}`);
  return res;
};

export default getByPostId;
