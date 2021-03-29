import axios from '@/utils/axios'

// 二维码key生成接口(带上时间戳,防止缓存)
function getQRKey() {
  return axios.get(`/login/qr/key?timerstamp=${Date.now()}`);
}

/**
 * 二维码生成接口
 * @param {*} key 二维码key
 */
function qrCreate(key) {
  return axios.get(`/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`);
}

/**
 * 二维码检测扫码状态接口
 * @param {*} key 二维码key
 */
function qrCheck(key) {
  return axios.get(`/login/qr/create?key=${key}&timerstamp=${Date.now()}`);
}

// 获取登录状态
function getLoginStatus() {
  return axios.get('/login/status');
}



let login = {
  getQRKey,
  qrCreate,
  qrCheck,
  getLoginStatus
}

export default login;