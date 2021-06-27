import axios from '@/utils/axios';

export default {
  // 获取所有榜单
  getTopList() {
    return axios.get(`/toplist`);
  },
};
