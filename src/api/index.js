import axios from '@/utils/axios'

/**
 * 获取banner数据
 */
function getBanner() {
  return axios.get('/banner');
}

let api = {
  getBanner
};

export default api;
