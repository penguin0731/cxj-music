export default {
  // audio元素
  audioDom: state => state.audioDom,
  // 播放模式 0列表循环，1顺序播放，2随机播放，3单曲循环
  mode: state => state.mode,
  // 播放状态
  isPlaying: state => state.isPlaying,
  // 播放列表
  playList: state => state.playList,
  // 当前音乐索引
  currentIndex: state => state.currentIndex,
  // 是否静音
  isMute: state => state.isMute,
  // 当前播放音乐
  curMusic: state => state.playList[state.currentIndex] || {},
  // 用户id
  Uid: state => state.Uid,
}