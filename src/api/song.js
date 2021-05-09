import axios from '@/utils/axios'

/**
 * 获取歌曲详情
 * @param {*} ids 音乐id,支持多个id,用,隔开
 */
function getDetail(ids) {
  return axios.get(`/song/detail?ids=${ids}`);
}

/**
 * 获取歌词
 * @param {*} id 音乐id
 */
function getLyric(id) {
  return axios.get(`/lyric?id=${id}`);
}

/**
 * 歌曲评论
 * @param {*} id 音乐id
 */
function getComment(id) {
  return axios.get(`/comment/music?id=${id}`);
}


let song = {
  getDetail,
  getLyric,
  getComment
}

export default song;