import emoji from '../../emoji.json';

export class Song {
  constructor({ id, name, singer, album, image, duration, url }) {
    this.id = id;
    this.name = name; // 歌名
    this.singer = singer; // 歌手
    this.album = album; // 专辑
    this.image = image; // 专辑图片
    this.duration = duration; // 歌曲时长(ms)
    this.url = url; // 歌曲链接
    this.durationSeconds = this.duration / 1000; // 歌曲时长(s)
    this.formatDur = format(this.durationSeconds); // 格式化歌曲时长 00:00
  }
}

/**
 * 创建音乐对象
 * @param {*} music 歌曲详情接口返回的song字段
 */
export function createSong(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar,
    album: music.al,
    image: music.al.picUrl,
    duration: music.dt,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  });
}

/**
 * 创建歌曲列表
 * @param {*} list 歌曲列表
 */
export function createSongList(list) {
  return list.map(music => createSong(music));
}

/**
 * 补0函数
 * @param {*} s 数字
 * @returns
 */
export function addZero(s) {
  return s < 10 ? `0${s}` : s;
}

/**
 * 格式化歌曲时间
 * @param {*} duration 歌曲时间(s)
 * @returns
 */
export function format(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  return `${addZero(minutes)}:${addZero(seconds)}`;
}

/**
 * 歌词解析
 * @param {*} lyric 歌词
 */
export function parseLyric(lyric) {
  let lyricArr = lyric.split('\n');
  lyricArr = lyricArr
    .map(lrc => {
      if (!lrc) return null;
      let timeParts = lrc.split(']')[0].replace('[', '').split(':');
      let words = lrc.split(']')[1];
      words = words ? words.trim() : words;
      let minutes = parseInt(timeParts[0]);
      let seconds = parseFloat(timeParts[1]);
      let time = minutes * 60 + seconds;
      return {
        time,
        words
      };
    })
    .filter(lrc => lrc);
  return lyricArr;
}

/**
 * 同步歌词
 * @param {*} lyric 原歌词
 * @param {*} tlyric 翻译歌词
 */
export function syncLyric(lyric, tlyric) {
  let lyricFrontInfo = [];
  for (let i = 0; i < lyric.length; i++) {
    let lTime = lyric[i].time;
    let tTime = tlyric[0].time;
    if (lTime == tTime) break;
    lyricFrontInfo.push(lyric.shift()); // 数组长度已改变
    --i; // 调整索引
  }
  let nullFrontInfo = lyricFrontInfo.map(item => {
    return {
      time: item.time,
      words: ''
    };
  });
  lyric.unshift(...lyricFrontInfo);
  tlyric.unshift(...nullFrontInfo);
  return [lyric, tlyric];
}

/**
 * 处理带有emoji字符的评论
 * @param {*} content 评论
 * @returns 带有emoji的评论
 */
export function handleComments(content) {
  let cont = content.replace(/\n/g, '<br>');
  let matchArr = cont.match(/\[.*?\]/g);
  if (!matchArr) return cont;
  let matchArrLen = matchArr.length;
  for (let i = 0; i < matchArrLen; i++) {
    let item = matchArr[i];
    let emojiKey = item.replace('[', '').replace(']', '');
    if (!emoji.hasOwnProperty(emojiKey)) continue;
    let emojiValue = emoji[emojiKey];
    let replaceStr = `<img class="emoji" src="http://s1.music.126.net/style/web2/emt/emoji_${emojiValue}.png">`;
    cont = cont.replace(item, replaceStr);
  }
  return cont;
}
