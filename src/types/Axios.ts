import axios from 'axios';

// import { useRouter } from 'vue-router';

import router from '@/router';

const SERVER_NAME = process.env.VUE_APP_HOST; //'http://localhost:8000';
// const SERVER_NAME = 'https://pixcardio.com'
const API_BASE = `${SERVER_NAME}/api`;

const client = axios.create({
  baseURL: API_BASE
});

const isAuthUrl = (url: string | undefined) => {
  if (!url) return false;
  return url.includes('/auth/jwt');  
};

const getAccessToken = () => {
  const value = window.localStorage.getItem('token');
  if (value == null) return null;
  try {
    const tokenJson = JSON.parse(value);
    return tokenJson.access;
  } catch (err) {
    return null
  } 
};

client.interceptors.request.use(req => {
  // Important: request interceptors **must** return the request.
  if (isAuthUrl(req.url) || req.url === '/signup/') return req;
  const accessToken = getAccessToken();
  
  if (accessToken == null) {
    // router.push({ name: 'Login' });
    // window.location.href = '/'
    return req;
  }
  req.headers.Authorization = `JWT ${accessToken}`;
  console.log(req.headers)
  return req;
});

client.interceptors.response.use(
  res => res,
  error => {
    // const router = useRouter();
    
    if (error.response == null) return;
    const { status } = error.response;
    // alert(error.config.url)
    if (!isAuthUrl(error.config.url) && status === 401) {
      // alert('goto login')
      router.push({ name: 'Login' });
      // router.push({ name: 'Login' });
      // window.location.href = '/'
      throw error;
    }
    throw error;
  }
);

export {
  client,
  SERVER_NAME
};