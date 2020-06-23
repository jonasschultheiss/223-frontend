import axios from '../axiosInstance';

const deleteComment = async (jwt, commentId) => {
  const res = await axios.delete(`/comment/${commentId}`, {
    headers: { authorization: `Bearer ${jwt}` },
    data: { commentId },
  });
  return res;
};

export default deleteComment;
