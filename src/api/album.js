import axios from '@/utils/axios';

export default {
  // 获取新碟上架
  getNewAlbum() {
    return axios.get(`/top/album`);
  },
  // 获取所有新碟
  getAllAlbum() {
    return axios.get(`/album/new`);
  }
};
