import useAxios from '@/types/Axios';

import { ILogin, ISignup, ICustomer, IPrescript, IToken, IRegistration } from '@/types/Interfaces';
import { ref, computed, ComputedRef, withDirectives, WritableComputedRef, Ref } from 'vue';
import { cloneDeep, clone, runInContext, words } from "lodash";

const token = ref<IToken | null>(null)
const profile = ref<ICustomer | null>(null)
  
export default function useAuth () {
  const TOKEN_KEY = 'doctor_token'
  const PROFILE_KEY = 'doctor_profile'
  // const TOKEN_KEYS: { [key: string]: string } = {
  //   customer: 'customer_token',
  //   doctor: 'doctor_token'
  // }
  // const PROFILE_KEYS: { [key: string]: string } = {
  //   customer: 'customer_profile',
  //   doctor: 'doctor_profile'
  // }
  const {
    client
  } = useAxios();

  
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
  
  

  
  const createToken = async (postData: ILogin) => {
    const {data} = await client.post('/auth/jwt/create/', postData);
    // console.log(data)
    return data;
    // window.localStorage.setItem('token', JSON.stringify(data));    
  };
  
  const storeToken = (data: IToken) => {
    token.value = data;
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
  }
  
  const removeToken = () => {
    token.value = null;
    window.localStorage.removeItem(TOKEN_KEY);
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
    profile.value = data;
    console.log('storing' + profile.value)
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
  }
  const getTokenFromLS = () => {
    const d = window.localStorage.getItem(TOKEN_KEY)
    //alert(d)
    if (d == null) return null;
    return JSON.parse(d);
  }
  const getProfileFromLS = () => {
    const data = window.localStorage.getItem('doctor_profile')
    console.log(data)
    if (data == null) return null;
    return JSON.parse(data);

  }
  const removeProfile = () => {
    profile.value = null;
    window.localStorage.removeItem(PROFILE_KEY)
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
    token,
    getTokenFromLS,
    removeToken,
    getUserId,
    profile,
    getProfile,
    getProfileFromLS,
    removeProfile,
    storeProfile,
    signup,
    getUUID
  }
}