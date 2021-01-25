import axios from 'axios';

import { useRouter } from 'vue-router';


const SERVER_NAME = process.env.VUE_APP_HOST; //'http://localhost:8000';
// const SERVER_NAME = 'https://pixcardio.com'
const API_BASE = `${SERVER_NAME}/api`;
const client = axios.create({
  baseURL: API_BASE
});

client.interceptors.request.use(req => {
  // Important: request interceptors **must** return the request.
  if (req.url === '/gettoken/' || req.url === '/signup/') return req;
  const token = window.localStorage.getItem('token');
  if (token == null) {
    // router.push({ name: 'Login' });
    window.location.href = '/'
  }
  req.headers.Authorization = `Token ${token}`;
  return req;
});
client.interceptors.response.use(
  res => res,
  error => {
    const router = useRouter();
    if (error.response == null) return;
    const { status } = error.response;
    if (status === 401) {
      // router.push({ name: 'Login' });
    // router.push({ name: 'Login' });
      window.location.href = '/'
      return;
    }
    throw error;
  }
);

export { client, SERVER_NAME };