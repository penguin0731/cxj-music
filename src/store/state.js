export default {
  audioDom: null, // audio元素
  mode: 0, // 播放模式 0列表循环，1顺序播放，2随机播放，3单曲循环
  isPlaying: false, // 播放状态
  playList: [], // 播放列表
  currentIndex: -1, // 当前音乐索引
  voice: true, // 是否开启声音
}