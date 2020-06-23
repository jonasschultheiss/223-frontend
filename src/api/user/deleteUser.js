import axios from '../axiosInstance';

const deleteUser = async (jwt, userId) => {
  const res = await axios.delete('/user', {
    headers: { authorization: `Bearer ${jwt}` },
    data: { userId },
  });

  return res;
};

export default deleteUser;
