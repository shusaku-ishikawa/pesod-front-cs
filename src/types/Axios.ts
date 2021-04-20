import axios from 'axios';

// import { useRouter } from 'vue-router';

import router from '@/router';
import { useRoute } from 'vue-router';
const SERVER_NAME = process.env.VUE_APP_HOST; //'http://localhost:8000';
// const SERVER_NAME = 'https://pixcardio.com'
const API_BASE = `${SERVER_NAME}/api`;


const isAuthUrl = (url: string | undefined) => {
  if (!url) return false;
  return url.includes('/auth/jwt');  
};


export default function useAxios(userType = 'customer') {
  const route = useRoute();
  const TOKEN_KEYS: { [key: string]: string } = {
    customer: 'customer_token',
    doctor: 'doctor_token',
  }
  const getAccessToken = () => {
    const value = window.localStorage.getItem(TOKEN_KEYS[userType]);
    if (value == null) return null;
    try {
      const tokenJson = JSON.parse(value);
      return tokenJson.access;
    } catch (err) {
      return null
    } 
  };
  
  const client = axios.create({
    baseURL: API_BASE
  });
  const loginRouteName = userType == 'customer' ? 'Login' : 'DoctorLogin';
  client.interceptors.request.use(req => {
    // Important: request interceptors **must** return the request.
    if (isAuthUrl(req.url) || req.url === '/signup/') return req;
    const accessToken = getAccessToken();
    
    if (accessToken == null) {
      router.push({ name: loginRouteName });
      // window.location.href = '/'
      return req;
    }
    req.headers.Authorization = `JWT ${accessToken}`;
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
        alert('goto login')
        alert(loginRouteName)
        console.log(error.config)

        router.push({ name: loginRouteName, query: { next: route.path }});
        // router.push({ name: 'Login' });
        // window.location.href = '/'
        throw error;
      }
      throw error;
    }
  );
  return {
    client
  }
}

export {
  SERVER_NAME
};