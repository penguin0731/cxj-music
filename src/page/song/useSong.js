import { ref, computed, reactive, onMounted, watchEffect, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'
import { parseLyric, syncLyric } from '@/utils/util'

export default function() {
  const route = useRoute();
  let songId = ref('');
  let songInfo = reactive({
    name: '',
    alia: [],
    ar: [],
    al: [],
    publishTime: 0,
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
  
  const getSongDetail = (id) => {
    if(!id) return;
    api.song.getDetail(id).then(res => {
      if(res.songs.length > 0) {
        songInfo.name = res.songs[0].name;
        songInfo.alia = res.songs[0].alia;
        songInfo.ar = res.songs[0].ar;
        songInfo.al = res.songs[0].al;
        songInfo.publishTime = res.songs[0].publishTime;
      }
    })
  }

  const getLyric = (id) => {
    if(!id) return;
    api.song.getLyric(id).then(res => {
      console.log('getLyric', res)
      let tempLyric = parseLyric(res.lrc.lyric);
      let tempTlyric = parseLyric(res.tlyric.lyric);
      if(tempTlyric.length > 0) {
        let lyricArr = syncLyric(parseLyric(res.lrc.lyric), parseLyric(res.tlyric.lyric));
        lyric.lyric = lyricArr[0];
        lyric.tlyric = lyricArr[1];
      }else {
        lyric.lyric = tempLyric;
        lyric.tlyric = tempTlyric;
      }
      console.log(lyric.lyric, lyric.tlyric);
    })
  }

  const getComment = (id) => {
    if(!id) return;
    api.song.getComment(id).then(res => {
      console.log('getComment', res)
      comment.comments = res.comments;
      comment.hotComments = res.hotComments;
      comment.commentTotal = res.total;
    })
  }

  watchEffect(() => {
    let id = route.query.id;
    songId.value = id ? id : '';
    getSongDetail(songId.value);
    getLyric(songId.value);
    getComment(songId.value);
  })

  

  return {
    songId,
    ...toRefs(songInfo),
    ...toRefs(comment),
    ...toRefs(lyric)
  }
}