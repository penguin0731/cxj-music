import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.status === 200 && res.data.code === 200) {
    return res.data
  }
  return Promise.reject(res)
}, err => {
  Promise.reject(err)
})

export default axios;