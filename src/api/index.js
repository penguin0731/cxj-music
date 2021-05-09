import axios from '@/utils/axios'
import login from './login'
import user from './user'
import song from './song'

// 获取banner数据
function getBanner() {
  return axios.get('/banner');
}

let api = {
  getBanner,
  login,
  user,
  song
};

export default api;
