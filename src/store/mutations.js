export default {
  setAudioDom(state, dom) {
    state.audioDom = dom;
  },
  setMode(state, mode) {
    mode >= 4 ? state.mode = 0 : state.mode = mode;
  },
  setIsPlaying(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  setPlayList(state, playList) {
    state.playList = playList;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  setVoice(state, voice) {
    state.voice = voice;
  }
}