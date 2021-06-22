import {
  ref,
  computed,
  reactive,
  onMounted,
  onBeforeUpdate,
  watchEffect,
  toRefs
} from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '@/api';
import { createSong } from '@/utils/song';
import { clone } from '@/utils/util';
import nProgress from 'nprogress';

export default function () {
  const store = useStore();
  const route = useRoute();
  let songInfo = reactive({
    id: '', // id
    name: '', // 歌名
    alia: [], // 别称
    ar: [], // 歌手
    al: {}, // 专辑
    publishTime: 0 // 发行时间
  });
  let detail = ref(null);
  let lyric = ref('');
  let tlyric = ref('');
  let comment = reactive({
    comments: [],
    hotComments: [],
    commentTotal: 0
  });
  let cxjPlayer = computed(() => store.getters.audioDom);
  let playList = computed(() => store.getters.playList);

  const openLyric = () => {
    lyricBtn.value = lyricBtn.value == '展开' ? '收起' : '展开';
  };

  const play = () => {
    let index = -1;
    let isInList = playList.value.some((item, idx) => {
      if (item.id == songInfo.id) {
        index = idx;
      }
      return item.id == songInfo.id;
    });
    if (isInList) {
      // 如果该歌曲已存在播放列表，则将该歌曲的索引设置为当前音乐索引
      store.commit('setCurrentIndex', index);
    } else {
      // 不存在则将该歌曲插入到播放列表最前面
      let list = clone(playList.value);
      list.unshift(createSong(detail.value));
      store.commit('setPlayList', list);
      store.commit('setCurrentIndex', 0);
    }
    cxjPlayer.value.currentTime = 0; // 重头播放
    store.commit('setIsPlaying', true);
  };

  // 获取歌曲基本信息
  const getDetailCallBack = res => {
    if (res.songs.length > 0) {
      detail.value = res.songs[0];
      songInfo.id = res.songs[0].id;
      songInfo.name = res.songs[0].name;
      songInfo.alia = res.songs[0].alia;
      songInfo.ar = res.songs[0].ar;
      songInfo.al = res.songs[0].al;
      songInfo.publishTime = res.songs[0].publishTime;
    }
  };

  // 获取歌曲歌词
  const getLyricCallBack = res => {
    lyric.value = res.lrc.lyric;
    tlyric.value = res.tlyric.lyric;
  };

  // 获取歌曲评论
  const getCommentCallBack = res => {
    comment.comments = res.comments;
    comment.hotComments = res.hotComments;
    comment.commentTotal = res.total;
  };

  // 获取歌曲详情
  const getSongDetail = async id => {
    let promiseArr = [
      api.song.getDetail(id),
      api.song.getLyric(id),
      api.song.getComment(id)
    ];
    let cbArr = [getDetailCallBack, getLyricCallBack, getCommentCallBack];
    const resArr = await Promise.all(promiseArr);
    resArr.forEach((res, index) => {
      cbArr[index](res);
    });
  };

  onMounted(async () => {
    let id = route.query.id;
    await getSongDetail(id);
    nProgress.done();
  });

  // 路由参数中的id变化时，重新调用接口
  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    let fromId = from.query.id;
    if (toId !== fromId) {
      await getSongDetail(toId);
      nProgress.done();
    }
  });

  return {
    ...toRefs(songInfo),
    ...toRefs(comment),
    lyric,
    tlyric,
    openLyric,
    play
  };
}
