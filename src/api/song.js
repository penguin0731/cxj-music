import axios from '@/utils/axios';

export default {
  /**
   * 获取歌曲详情
   * @param {*} ids 音乐id,支持多个id,用,隔开
   */
  getDetail(ids) {
    return axios.get(`/song/detail?ids=${ids}`);
  },
  /**
   * 获取歌词
   * @param {*} id 音乐id
   */
  getLyric(id) {
    return axios.get(`/lyric?id=${id}`);
  },
  /**
   * 歌曲评论
   * @param {*} id 音乐id
   */
  getComment({ id, pageSize = 20, page }) {
    let params = {
      id,
      limit: pageSize
    };
    page ? (params.offset = pageSize * page) : '';
    return axios({
      url: '/comment/music',
      params
    });
  }
};
