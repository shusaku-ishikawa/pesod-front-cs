import useAxios from '@/types/Axios';

import { ILogin, ISignup, ICustomer, IPrescript, IToken, IRegistration } from '@/types/Interfaces';
import { ref, computed, ComputedRef, withDirectives, WritableComputedRef, Ref } from 'vue';
import { cloneDeep, clone, runInContext, words } from "lodash";

const token = ref<IToken | null>(null)
const profile = ref<ICustomer | null>(null)
  
export default function useAuth () {
  const TOKEN_KEY = 'cs_token'
  const PROFILE_KEY = 'cs_profile'
  
  const {
    client
  } = useAxios();

  
  const getUUID = async () => {
    const {data} = await client.get('/uuid/')
    return data;
  }
  
  
  const createToken = async (postData: ILogin) => {
    const {data} = await client.post('/token/create/cs', postData);
    console.log(data)
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
    return data;
  };
  
  const storeProfile = (data: any) => {
    profile.value = data;
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
  }
  const getTokenFromLS = () => {
    const d = window.localStorage.getItem(TOKEN_KEY)
    //alert(d)
    if (d == null) return null;
    return JSON.parse(d);
  }
  const getProfileFromLS = () => {
    const data = window.localStorage.getItem(PROFILE_KEY)
    if (data == null) return null;
    return JSON.parse(data);

  }
  const removeProfile = () => {
    profile.value = null;
    window.localStorage.removeItem(PROFILE_KEY)
  }
  
  
  
  return {
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
    getUUID
  }
}