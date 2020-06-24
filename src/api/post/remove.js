import axios from '../axiosInstance';

const remove = async (jwt, postId) => {
  const res = await axios.delete(`/image/${postId}`, {
    headers: {
      authorization: `Bearer ${JSON.stringify(jwt)}`,
    },
    data: {
      imageId: postId,
    },
  });
  return res;
};

export default remove;
