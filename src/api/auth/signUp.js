import jwtDecode from 'jwt-decode';
import axios from '../axiosInstance';

const signUp = async (username, email, password) => {
  const res = await axios.post('/auth/signup', { username, email, password });
  console.log('signUp -> res', res);
  const jwt = { ...jwtDecode(res.access_token), jwt: res.access_token };
  console.log('signUp -> jwt', jwt);
  return jwt;
};

export default signUp;
