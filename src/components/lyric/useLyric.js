import {
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  onBeforeUpdate,
  watchEffect
} from 'vue';
import { useStore } from 'vuex';
import { parseLyric, syncLyric } from '@/utils/song';

export default function (props) {
  const store = useStore();
  let data = reactive({
    lyricBtn: '展开',
    lyricList: [], // 歌词列表
    tlyricList: [], // 翻译歌词列表
    lyricIdx: 0, // 当前歌词的索引
    marginTop: 0
  });
  let pRefs = ref([]);
  let lyric_box = ref(null);
  let song_lyric_cont = ref(null);
  let cxjPlayer = computed(() => store.getters.audioDom);
  let curMusic = computed(() => store.getters.curMusic);
  let isMouseDown = computed(() => store.getters.isMouseDown);

  const openLyric = () => {
    data.lyricBtn = data.lyricBtn == '展开' ? '收起' : '展开';
  };

  const getLyricList = () => {
    let lyric = props.lyric;
    let tlyric = props.tlyric;
    if (!lyric) return;
    let tempLyric = parseLyric(lyric);
    let tempTlyric = parseLyric(tlyric);
    if (tempTlyric.length > 0) {
      // 如果有翻译歌词，则将原歌词和翻译歌词的长度进行同步
      let lyricArr = syncLyric(tempLyric, tempTlyric);
      data.lyricList = lyricArr[0];
      data.tlyricList = lyricArr[1];
    } else {
      data.lyricList = tempLyric;
      data.tlyricList = tempTlyric;
    }
    console.log(data.lyricList, data.tlyricList);
  };

  // 获取当前歌词的索引
  const getCurrentIndex = () => {
    let playTime = cxjPlayer.value.currentTime + 0.5; // 修正值0.8
    for (let i = data.lyricList.length - 1; i >= 0; i--) {
      let lyrObj = data.lyricList[i];
      if (playTime >= lyrObj.time) {
        return i;
      }
    }
    return -1;
  };

  // 设置当前歌词的索引
  const setCurrent = () => {
    let index = getCurrentIndex();
    data.lyricIdx = index;
    setMarginTop();
  };

  // 通过当前歌词索引计算需要上移的偏移量
  const setMarginTop = () => {
    if (!lyric_box.value || !lyric_box.value.clientHeight) return;
    let midHeight =
      lyric_box.value.clientHeight / 2 -
      pRefs.value[data.lyricIdx].clientHeight / 2;
    let top =
      midHeight - pRefs.value[data.lyricIdx].clientHeight * data.lyricIdx;
    // marginTop不能为正数
    if (top > 0) top = 0;
    // 当滚动的距离+容器高度>歌词内容高度时，则不再滚动
    if (lyric_box.value.clientHeight - top > song_lyric_cont.value.clientHeight)
      return;
    data.marginTop = top;
  };

  const getLineHeight = i => {
    if (data.tlyricList.length == 0) {
      // 没有翻译歌词
      return '20px';
    } else {
      return data.tlyricList[i] && data.tlyricList[i].words ? '20px' : '40px';
    }
  };

  onMounted(() => {
    cxjPlayer.value.ontimeupdate = () => {
      if (!isMouseDown.value) {
        store.commit('setCurrentTime', cxjPlayer.value.currentTime);
      }
      setCurrent();
    };
  });

  watchEffect(() => {
    getLyricList();
  });

  // 确保在每次更新之前重置ref
  onBeforeUpdate(() => {
    pRefs.value = [];
  });

  return {
    ...toRefs(data),
    curMusic,
    pRefs,
    lyric_box,
    song_lyric_cont,
    openLyric,
    getLineHeight
  };
}
