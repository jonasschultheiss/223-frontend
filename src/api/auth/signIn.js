import jwtDecode from 'jwt-decode';
import axios from '../axiosInstance';

const signIn = async (username, password) => {
  const res = await axios.post('/auth/signin', { username, password });
  const jwt = { ...jwtDecode(res.access_token), jwt: res.access_token };
  return jwt;
};

export default signIn;
