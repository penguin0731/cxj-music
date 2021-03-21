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
 * @param {*} duration 歌曲时间(ms)
 * @returns 
 */
export function format(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  return `${addZero(minutes)}:${addZero(seconds)}`;
}