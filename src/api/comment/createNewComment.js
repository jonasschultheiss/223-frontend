import axios from '../axiosInstance';

const createNewComment = async (jwt, imageId, text) => {
  const res = await axios.post('/comment', {
    headers: { authorization: `Bearer ${jwt}` },
    data: { imageId, text },
  });
  return res;
};

export default createNewComment;
