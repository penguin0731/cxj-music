import axios from '@/utils/axios'

export default {
  /**
   * 获取歌手部分信息和热门歌曲
   * @param {*} id 歌手id
   */
  getArtists(id) {
    return axios.get(`/artists?id${id}`);
  },
  /**
   * 获取歌手详情
   * @param {*} id 歌手 id
   */
  getDetail(id) {
    return axios.get(`/artist/detail?id=${id}`);
  },
  /**
   * 获取歌手全部歌曲
   * @param {*} params 
   */
  getSongs(params) {
    return axios.get(`/artist/songs`, { params });
  },
  /**
   * 获取歌手专辑
   * @param {*} id 歌手id
   */
  getAlbum(id) {
    return axios.get(`/artist/album?id=${id}`);
  },
  /**
   * 获取歌手MV
   * @param {*} id 歌手id
   */
   getMV(id) {
    return axios.get(`/artist/mv?id=${id}`);
  },
};