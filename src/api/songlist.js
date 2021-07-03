import axios from '@/utils/axios';

export default {
  // 获取歌单分类
  getCatList() {
    return axios.get(`/playlist/catlist`);
  },
  // 获取热门歌单分类
  getHot() {
    return axios.get(`/playlist/hot`);
  },
  getDetail(id) {
    return axios.get(`/playlist/detail?id=${id}`);
  }
};
