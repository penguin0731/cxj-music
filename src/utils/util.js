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