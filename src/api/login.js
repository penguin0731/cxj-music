import axios from '@/utils/axios';

export default {
  /**
   * 二维码key生成接口(带上时间戳,防止缓存)
   */
  getQRKey() {
    return axios.get(`/login/qr/key?timerstamp=${Date.now()}`);
  },
  /**
   * 二维码生成接口
   * @param {*} key 二维码key
   */
  qrCreate(key) {
    return axios.get(
      `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`
    );
  },
  /**
   * 二维码检测扫码状态接口
   * @param {*} key 二维码key
   */
  qrCheck(key) {
    return axios.get(`/login/qr/check?key=${key}&timerstamp=${Date.now()}`);
  },
  /**
   * 获取登录状态
   */
  getStatus() {
    return axios.get(
      `/login/status?cookie=${localStorage.getItem(
        'cxjMusic_cookie'
      )}&timerstamp=${Date.now()}`
    );
  },
  /**
   * 退出登录
   */
  logout() {
    return axios.get('/logout');
  }
};
