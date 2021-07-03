import axios from '@/utils/axios';
import login from './login';
import user from './user';
import song from './song';
import artist from './artist';
import toplist from './toplist';
import songlist from './songlist';

export default {
  /**
   * 获取banner数据
   */
  getBanner() {
    return axios.get('/banner');
  },
  login,
  user,
  song,
  artist,
  toplist,
  songlist
};
