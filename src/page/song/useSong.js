import { ref, computed, reactive, onMounted, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import api from '@/api'
import { parseLyric, syncLyric } from '@/utils/song'
import { clone } from '@/utils/util'
import nProgress from 'nprogress'

export default function() {
  const store = useStore();
  const route = useRoute();
  let songInfo = reactive({
    name: '', // 歌名
    alia: [], // 别称
    ar: [], // 歌手
    al: {}, // 专辑
    publishTime: 0, // 发行时间
  });
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
  let playList = computed(() => store.getters.playList);
  
  const openLyric = () => {
    lyricBtn.value = lyricBtn.value == '展开' ? '收起' : '展开';
  }

  const play = () => {
    // let list = clone(playList.value);
    // list.unshift({

    // })
    // store.commit('setPlayList', list);
  }

  const getDetailCallBack = res => {
    if(res.songs.length > 0) {
      songInfo.name = res.songs[0].name;
      songInfo.alia = res.songs[0].alia;
      songInfo.ar = res.songs[0].ar;
      songInfo.al = res.songs[0].al;
      songInfo.publishTime = res.songs[0].publishTime;
    }
  }

  const getLyricCallBack = res => {
    console.log('getLyric', res)
    let tempLyric = parseLyric(res.lrc.lyric);
    let tempTlyric = parseLyric(res.tlyric.lyric);
    if(tempTlyric.length > 0) {
      let lyricArr = syncLyric(tempLyric, tempTlyric);
      lyric.lyric = lyricArr[0];
      lyric.tlyric = lyricArr[1];
    }else {
      lyric.lyric = tempLyric;
      lyric.tlyric = tempTlyric;
    }
    console.log(lyric.lyric, lyric.tlyric);
  }

  const getCommentCallBack = res => {
    console.log('getComment', res)
    comment.comments = res.comments;
    comment.hotComments = res.hotComments;
    comment.commentTotal = res.total;
  }

  const getSongDetail = async (id) => {
    let promiseArr = [api.song.getDetail(id), api.song.getLyric(id), api.song.getComment(id)];
    let cbArr = [getDetailCallBack, getLyricCallBack, getCommentCallBack];
    const resArr = await Promise.all(promiseArr);
    resArr.forEach((res, index) => {
      cbArr[index](res);
    });
    nProgress.done();
  }

  onMounted(async () => {
    let id = route.query.id;
    await getSongDetail(id);
  })

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
  }
}