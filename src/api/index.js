import axios from '@/utils/axios'
import login from './login'
import user from './user'

// 获取banner数据
function getBanner() {
  return axios.get('/banner');
}

let api = {
  getBanner,
  login,
  user
};

export default api;
