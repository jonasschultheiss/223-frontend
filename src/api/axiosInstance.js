import axios from 'axios';

const baseURL = process.env.BACKEND_URL;

const instance = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

function successHandling(response) {
  return response.data;
}

function errorHandling(error) {
  console.log('Network error:', error);
  return Promise.reject(error.response);
}

instance.interceptors.response.use(
  (response) => successHandling(response),
  (error) => errorHandling(error)
);

export default instance;
