import axios from 'axios';

const BS_URL = 'http://127.0.0.1';

const instance = axios.create({
  baseURL: BS_URL,
  timeout: 3000,
  // header: {}
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
});

// request拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
)

export const post = async <T>(url: string, params: object) => {
  let res: T = await instance.post(url, JSON.stringify(params));
  console.log(res);
  return res;
}
