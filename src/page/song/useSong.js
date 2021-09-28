import {
  ref,
  computed,
  reactive,
  onMounted,
  toRef,
  toRefs,
  isReactive
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
  let data = reactive({
    songInfo: {}, // 歌曲详情
    lyric: '', // 歌词
    tlyric: '', // 歌词翻译
    comment: {} // 评论
  });
  let cxjPlayer = computed(() => store.getters.audioDom);
  let playList = computed(() => store.getters.playList);

  const openLyric = () => {
    lyricBtn.value = lyricBtn.value == '展开' ? '收起' : '展开';
  };

  const play = () => {
    let index = -1;
    let isInList = playList.value.some((item, idx) => {
      if (item.id == data.songInfo.id) {
        index = idx;
      }
      return item.id == data.songInfo.id;
    });
    if (isInList) {
      // 如果该歌曲已存在播放列表，则将该歌曲的索引设置为当前音乐索引
      store.commit('setCurrentIndex', index);
    } else {
      // 不存在则将该歌曲插入到播放列表最前面
      let list = clone(playList.value);
      list.unshift(createSong(data.songInfo));
      store.commit('setPlayList', list);
      store.commit('setCurrentIndex', 0);
    }
    cxjPlayer.value.currentTime = 0; // 重头播放
    store.commit('setIsPlaying', true);
  };

  // 获取歌曲基本信息
  const getDetailCallBack = res => {
    if (res.songs.length > 0) {
      data.songInfo = res.songs[0];
    }
  };

  // 获取歌曲歌词
  const getLyricCallBack = res => {
    data.lyric = res.lrc.lyric;
    data.tlyric = res.tlyric.lyric;
  };

  // 获取歌曲评论
  const getCommentCallBack = res => {
    data.comment = res;
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
    ...toRefs(data),
    openLyric,
    play
  };
}
