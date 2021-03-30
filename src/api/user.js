import axios from '@/utils/axios'

/**
 * 获取用户详情
 * @param {*} uid 用户id
 */
function getDetail(uid) {
  return axios.get(`/user/detail?uid=${uid}`);
}

// 获取账号信息
function getAccount() {
  return axios.get(`/user/account`);
}

/**
 * 获取用户歌单
 * @param {*} uid 用户id
 */
function getPlayList(uid) {
  return axios.get(`/user/playlist?uid=${uid}`);
}


let user = {
  getDetail,
  getAccount,
  getPlayList
}

export default user;