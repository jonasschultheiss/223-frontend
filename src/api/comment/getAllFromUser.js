import axios from '../axiosInstance';

const deleteComment = async (jwt, userId) => {
  const res = await axios.get(`/comment/${userId}`);
  return res;
};

export default deleteComment;
