import axios from '../axiosInstance';

const createNewComment = async (jwt, imageId, text) => {
  const res = await axios.post(
    '/comment',
    {
      imageId,
      text,
    },
    {
      headers: { authorization: `Bearer ${jwt}` },
    }
  );
  return res;
};

export default createNewComment;
