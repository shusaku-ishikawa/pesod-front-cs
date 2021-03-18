import { client } from '@/types/Axios';
import { ILogin, ISignup, ICustomer, IPrescript, IToken, IRegistration } from '@/types/Interfaces';
import { computed, ComputedRef, WritableComputedRef } from 'vue';
import { cloneDeep, clone } from "lodash";

const token: WritableComputedRef<IToken | null> = computed({
  get: () => {
    const token = window.localStorage.getItem('token');
    if (token == null) return null;
    return JSON.parse(token);
  },
  set: (data: IToken | null) => {
    if (data == null) {
      window.localStorage.removeItem('token');
      return;
    }
    window.localStorage.setItem('token', JSON.stringify(data))
  }  
});

const profile = computed(() => {
  const data = window.localStorage.getItem('profile');
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
});



const isLoggedIn = computed(() => {
  return (token.value != null);
});

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
  const formDataCopy = cloneDeep(formData);
  
  formDataCopy.address = `${formDataCopy.street}${formDataCopy.building}`;
  delete formDataCopy.street;
  delete formDataCopy.building;
  const {data} = await client.put(registrationUrl, formDataCopy);
  console.log(data)
  return data;
}
const getToken = async (postData: ILogin) => {
  const {data} = await client.post('/auth/jwt/create/', postData);
  // console.log(data)
  return data;
  // window.localStorage.setItem('token', JSON.stringify(data));    
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


const signup = async (postData: ISignup) => {
  const { data } = await client.post(
    `/signup/`, postData
  );
};

const logout = () => {
  window.localStorage.removeItem('token');
};
export default function useAuth () {
  return {
    sendSignupEmail,
    activateAccount,
    registerProfile,
    token,
    profile,
    getUserId,
    getProfile,
    logout,
    signup,
    isLoggedIn,
    getToken,
  }
}