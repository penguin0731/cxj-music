import emoji from '../../../emoji.json';

export default function () {
  /**
   * 处理带有emoji字符的评论
   * @param {*} content 评论
   * @returns 带有emoji的评论
   */
  const handleComments = content => {
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
  };
  return {
    handleComments
  };
}
