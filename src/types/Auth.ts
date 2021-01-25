import { client } from '@/types/Axios';
import { ILogin, ISignup, IUser } from '@/types/Interfaces';
import { computed } from 'vue';

const token = computed(() => {
  const token = window.localStorage.getItem('token');
  return token;
});
const isLoggedIn = computed(() => {
  return (token.value != null);
});

const getToken = async (postData: ILogin) => {
  const { data } = await client.post('/gettoken/', postData);
  window.localStorage.setItem('token', data.token);
};
const signup = async (postData: ISignup) => {
  const { data } = await client.post(
    `/signup/`, postData
  );
  console.log(data);
};

const loginUser = computed((): IUser => {
  return {
    id: 1,
    name: 'Shusaku'
  }
});

const logout = () => {
  window.localStorage.removeItem('token');
};
export default function useAuth () {
  return {
    token,
    logout,
    signup,
    isLoggedIn,
    getToken,
    loginUser
  }
}