import useAxios from '@/types/Axios';

import { ILogin, ISignup, ICustomer, IPrescript, IToken, IRegistration } from '@/types/Interfaces';
import { computed, ComputedRef, withDirectives, WritableComputedRef } from 'vue';
import { cloneDeep, clone, runInContext, words } from "lodash";


export default function useAuth (userType = 'customer') {
  const TOKEN_KEYS: { [key: string]: string } = {
    customer: 'customer_token',
    doctor: 'doctor_token'
  }
  const {
    client
  } = useAxios(userType);

  const getUUID = async () => {
    const {data} = await client.get('/uuid/')
    console.log(data)
    return data;
  }
  
  const sendSignupEmail = async (formData: any) => {
    const {data} = await client.post('/customer_pre_create/', formData);
    console.log(data);
    return data;  
  };
  const activateAccount = async (token: string) => {
    const {data} = await client.get(`/customer_activator/${token}`);
    console.log(data)
    return data;  
  };
  const registerProfile = async (registrationUrl: string, formData: IRegistration) => {
    const formDataCopy: any = cloneDeep(formData);
    
    formDataCopy.address = `${formDataCopy.street}${formDataCopy.building}`;
    delete formDataCopy.street;
    delete formDataCopy.building;
    const {data} = await client.put(registrationUrl, formDataCopy);
    console.log(data)
    return data;
  }
  
  const getToken = () => {
    console.log('getting token from ' + TOKEN_KEYS[userType])
    const d = window.localStorage.getItem(TOKEN_KEYS[userType])
    if (d == null) return;
    return JSON.parse(d);
  }
  const createToken = async (postData: ILogin) => {
    const {data} = await client.post('/auth/jwt/create/', postData);
    // console.log(data)
    return data;
    // window.localStorage.setItem('token', JSON.stringify(data));    
  };
  
  const storeToken = (token: IToken) => {
    console.log('storeing token' + TOKEN_KEYS[userType])
    window.localStorage.setItem(TOKEN_KEYS[userType], JSON.stringify(token))
  }
  
  const removeToken = () => {
    window.localStorage.removeItem(TOKEN_KEYS[userType]);
  };
  
  const getUserId = async () => {
    const {data} = await client.get('/auth/users/me/')
    return data.id;
  };
  
  const getProfile = async (userId: number) => {
    const {data} = await client.get(`/auth/users/${userId}/`);
    console.log(data)
    return data;
  };
  
  const storeProfile = (data: any) => {
    window.localStorage.setItem('profile', JSON.stringify(data))
  }
  const getProfileFromStorage = () => {
    const data = window.localStorage.getItem('profile')
  }
  const removeProfile = () => {
    window.localStorage.removeItem('profile')
  }
  
  
  const signup = async (postData: ISignup) => {
    const { data } = await client.post(
      `/signup/`, postData
    );
  };
  return {
    sendSignupEmail,
    activateAccount,
    registerProfile,
    createToken,
    storeToken,
    getToken,
    removeToken,
    getUserId,
    getProfile,
    getProfileFromStorage,
    removeProfile,
    storeProfile,
    signup,
    getUUID
  }
}