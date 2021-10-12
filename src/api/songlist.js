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
  // 获取歌单
  getSongList({ order = 'hot', cat = '全部', pageSize = 50, page }) {
    let params = {
      order,
      cat,
      limit: pageSize
    };
    page - 1 ? (params.offset = pageSize * (page - 1)) : '';
    return axios({
      url: `/top/playlist`,
      params
    });
  },
  // 获取歌单详情
  getDetail(id) {
    return axios.get(`/playlist/detail?id=${id}`);
  },
  // 获取歌单评论
  getComment({ id, pageSize = 20, page }) {
    let params = {
      id,
      limit: pageSize
    };
    page - 1 ? (params.offset = pageSize * (page - 1)) : '';
    return axios({
      url: '/comment/playlist',
      params
    });
  }
};
