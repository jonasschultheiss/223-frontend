import axios from '../axiosInstance';

const remove = async (jwt, userId, postId) => {
  const res = await axios.delete(`/image/${postId}`, {
    headers: {
      authorization: `Bearer ${JSON.stringify(jwt)}`,
    },
    data: {
      id: userId,
      imageId: postId,
    },
  });
  return res;
};

export default remove;
