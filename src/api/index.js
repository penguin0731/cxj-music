import axios from '@/utils/axios'
import login from './login'

// 获取banner数据
function getBanner() {
  return axios.get('/banner');
}

let api = {
  getBanner,
  login
};

export default api;
