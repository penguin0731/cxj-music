import axios from '@/utils/axios'

export default {
  /**
   * 获取用户详情
   * @param {*} uid 用户id
   */
  getDetail(uid) {
    return axios.get(`/user/detail?uid=${uid}`);
  },
  /**
   * 获取账号信息
   */
  getAccount() {
    return axios.get(`/user/account`);
  },
  /**
   * 获取用户歌单
   * @param {*} uid 用户id
   */
  getPlayList(uid) {
    return axios.get(`/user/playlist?uid=${uid}`);
  }
};