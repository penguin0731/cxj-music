/**
 * 补0函数
 * @param {*} s 数字
 * @returns 
 */
export function addZero(s) {
  return s < 10 ? `0${s}` : s;
}

/**
 * 获取随机索引 [0, num-1]
 * @param {*} num
 */
export function randomIndex(high) {
  return Math.floor(Math.random() * high)
}

/**
 * 格式化歌曲时间
 * @param {*} duration 歌曲时间(ms)
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
  lyricArr = lyricArr.map(lrc => {
    if(!lrc) return null;
    let timeParts = lrc.split(']')[0].replace('[', '').split(':');
    let words = lrc.split(']')[1];
    words = words ? words.trim() : words;
    let minutes = parseInt(timeParts[0]);
    let seconds = parseFloat(timeParts[1]);
    let time = minutes * 60 + seconds;
    return {
      time,
      words
    }
  }).filter(lrc => lrc);
  return lyricArr;
}

/**
 * 同步歌词
 * @param {*} lyric 原歌词
 * @param {*} tlyric 翻译歌词
 */
export function syncLyric(lyric, tlyric) {
  let lyricFrontInfo = [];
  for(let i = 0; i < lyric.length; i++) {
    let lTime = lyric[i].time;
    let tTime = tlyric[0].time;
    if(lTime == tTime) break;
    lyricFrontInfo.push(lyric.shift()); // 数组长度已改变
    --i; // 调整索引
  }
  let nullFrontInfo = lyricFrontInfo.map(item => {
    return {
      time: item.time,
      words: ''
    }
  })
  lyric.unshift(...lyricFrontInfo)
  tlyric.unshift(...nullFrontInfo)
  return [lyric, tlyric];
}

/**
 * 克隆对象
 * @param {*} origin 目标对象
 * @param {*} deep 是否深度克隆
 */
export function clone(origin, deep = true) {
  if(typeof origin != 'object') return origin;
  let obj = Array.isArray(origin) ? [] : {};
  for (const key in origin) {
    if (Object.hasOwnProperty.call(origin, key)) {
      if(deep) {
        obj[key] = clone(origin[key]);
      }else {
        obj[key] = origin[key];
      }
    }
  }
  return obj;
}

/**
 * 是否是string类型
 * @param {*} str 字符串
 */
export function isString(str) {
  return typeof str === 'string';
}

/**
 * 将http转为https
 * @param {*} url
 */
export function toHttps(url) {
  if (!isString(url)) {
    return url;
  }
  return url.replace('http://', 'https://');
}