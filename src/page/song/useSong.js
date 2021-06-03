import { ref, computed, reactive, onMounted, onBeforeUpdate, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import api from '@/api'
import { parseLyric, syncLyric, createSong } from '@/utils/song'
import { clone } from '@/utils/util'
import nProgress from 'nprogress'

export default function() {
  const store = useStore();
  const route = useRoute();
  let songInfo = reactive({
    id: '', // id
    name: '', // 歌名
    alia: [], // 别称
    ar: [], // 歌手
    al: {}, // 专辑
    publishTime: 0, // 发行时间
  });
  let detail = ref(null)
  let lyric = reactive({
    lyric: {},
    tlyric: {}
  });
  let comment = reactive({
    comments: [],
    hotComments: [],
    commentTotal: 0
  });
  let lyricBtn = ref('展开');
  let lyricIdx = ref(0); // 当前歌词的索引
  let pRefs = ref([]);
  let marginTop = ref(0);
  let lyric_box = ref(null)
  let cxjPlayer = computed(() => store.getters.audioDom);
  let playList = computed(() => store.getters.playList);
  let curMusic = computed(() => store.getters.curMusic);
  let isMouseDown = computed(() => store.getters.isMouseDown);
  
  const openLyric = () => {
    lyricBtn.value = lyricBtn.value == '展开' ? '收起' : '展开';
  }

  const play = () => {
    let index = -1;
    let isInList = playList.value.some((item, idx) => {
      if(item.id == songInfo.id) {
        index = idx;
      }
      return item.id == songInfo.id;
    });
    if(isInList) { // 如果该歌曲已存在播放列表，则将该歌曲的索引设置为当前音乐索引
      store.commit('setCurrentIndex', index);
    }else { // 不存在则将该歌曲插入到播放列表最前面
      let list = clone(playList.value);
      list.unshift(createSong(detail.value));
      console.log(createSong(detail.value), list);
      store.commit('setPlayList', list);
      store.commit('setCurrentIndex', 0);
    }
    lyricIdx.value = 0; // 重置歌词索引为0
    console.log('重置歌词索引为0', lyricIdx.value)
    cxjPlayer.value.currentTime = 0; // 重头播放
    store.commit('setIsPlaying', true);
  }

  // 获取歌曲基本信息
  const getDetailCallBack = res => {
    if(res.songs.length > 0) {
      detail.value = res.songs[0];
      songInfo.id = res.songs[0].id;
      songInfo.name = res.songs[0].name;
      songInfo.alia = res.songs[0].alia;
      songInfo.ar = res.songs[0].ar;
      songInfo.al = res.songs[0].al;
      songInfo.publishTime = res.songs[0].publishTime;
    }
  }

  // 获取歌曲歌词
  const getLyricCallBack = res => {
    console.log('getLyric', res)
    let tempLyric = parseLyric(res.lrc.lyric);
    let tempTlyric = parseLyric(res.tlyric.lyric);
    if(tempTlyric.length > 0) { // 如果有翻译歌词，则将原歌词和翻译歌词的长度进行同步
      let lyricArr = syncLyric(tempLyric, tempTlyric);
      lyric.lyric = lyricArr[0];
      lyric.tlyric = lyricArr[1];
    }else {
      lyric.lyric = tempLyric;
      lyric.tlyric = tempTlyric;
    }
    console.log(lyric.lyric, lyric.tlyric);
  }

  // 获取歌曲评论
  const getCommentCallBack = res => {
    console.log('getComment', res)
    comment.comments = res.comments;
    comment.hotComments = res.hotComments;
    comment.commentTotal = res.total;
  }

  // 获取歌曲详情
  const getSongDetail = async (id) => {
    let promiseArr = [api.song.getDetail(id), api.song.getLyric(id), api.song.getComment(id)];
    let cbArr = [getDetailCallBack, getLyricCallBack, getCommentCallBack];
    const resArr = await Promise.all(promiseArr);
    resArr.forEach((res, index) => {
      cbArr[index](res);
    });
    nProgress.done();
  }

  // 获取当前歌词的索引
  const getCurrentIndex = () => {
    let playTime = cxjPlayer.value.currentTime;
    for(let i = lyric.lyric.length - 1; i >= 0; i--) {
      let lyrObj = lyric.lyric[i];
      if(playTime >= lyrObj.time) {
        return i
      }
    }
    return -1
  }

  // 设置当前歌词的索引
  const setCurrent = () => {
    let index = getCurrentIndex();
    lyricIdx.value = index;
    setMarginTop();
  }

  // 通过当前歌词索引计算需要上移的偏移量
  const setMarginTop = () => {
    let midHeight = lyric_box.value.clientHeight / 2 - pRefs.value[lyricIdx.value].clientHeight / 2;
    let top = midHeight - pRefs.value[lyricIdx.value].clientHeight * lyricIdx.value;
    if(top > 0) top = 0; // marginTop不能为正数
    marginTop.value = top;
  }

  onMounted(async () => {
    let id = route.query.id;
    await getSongDetail(id);
    cxjPlayer.value.ontimeupdate = () => {
      if (!isMouseDown.value) {
        // currentTime.value = cxjPlayer.value.currentTime;
        store.commit('setCurrentTime', cxjPlayer.value.currentTime);
      }
      setCurrent();
    }
  })

  // 确保在每次更新之前重置ref
  onBeforeUpdate(() => {
    pRefs.value = []
  })

  // 路由参数中的id变化时，重新调用接口
  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    let fromId = from.query.id;
    if (toId !== fromId) {
      await getSongDetail(toId);
    }
  })

  

  return {
    ...toRefs(songInfo),
    ...toRefs(comment),
    ...toRefs(lyric),
    lyricBtn,
    openLyric,
    play,
    lyricIdx,
    pRefs,
    marginTop,
    lyric_box,
    curMusic,
  }
}