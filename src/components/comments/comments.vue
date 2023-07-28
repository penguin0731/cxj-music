<template>
  <div class="song_comments">
    <h2 v-if="hotComments.length > 0">热门评论</h2>
    <div class="song_commentsList mt10">
      <div
        class="song_commentsItem"
        v-for="item in hotComments"
        :key="item.commentId"
      >
        <div class="song_commentsItem_avatar">
          <img :src="item.user.avatarUrl" />
        </div>
        <h4 class="song_commentsItem_nickname">{{ item.user.nickname }}</h4>
        <div class="song_commentsItem_info">
          <div class="song_commentsItem_date">
            {{ moment(item.time).format('YYYY年MM月DD日 HH:mm') }}
          </div>
          <div class="song_commentsItem_like">
            <div class="comments_sprite comment_like"></div>
            {{ item.likedCount }}
          </div>
        </div>

        <div
          v-html="handleComments(item.content)"
          class="song_commentsItem_cont mt10"
        ></div>
      </div>
    </div>

    <h2 class="mt40">最新评论({{ total }})</h2>
    <div class="song_commentsList mt10">
      <div
        class="song_commentsItem"
        v-for="item in comments"
        :key="item.commentId"
      >
        <div class="song_commentsItem_avatar">
          <img :src="item.user.avatarUrl" />
        </div>
        <h4 class="song_commentsItem_nickname">{{ item.user.nickname }}</h4>
        <div class="song_commentsItem_info">
          <div class="song_commentsItem_date">
            {{ moment(item.time).format('YYYY年MM月DD日 HH:mm') }}
          </div>
          <div class="song_commentsItem_like">
            <div class="comments_sprite comment_like"></div>
            {{ item.likedCount ? item.likedCount : '' }}
          </div>
        </div>
        <div
          v-html="handleComments(item.content)"
          class="song_commentsItem_cont mt10"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import emoji from '../../../emoji.json';
// import useComments from './useCommets';

const props = defineProps({
  hotComments: {
    type: Array,
    default: () => []
  },
  comments: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number
  },
  currentPage: {
    type: Number
  }
});

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

// export default {
//   props: {
//     hotComments: {
//       type: Array,
//       default: () => []
//     },
//     comments: {
//       type: Array,
//       default: () => []
//     },
//     total: {
//       type: Number
//     },
//     currentPage: {
//       type: Number
//     }
//   },
//   setup() {
//     return {
//       moment,
//       ...useComments()
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.mt40 {
  margin-top: 40px;
}
.song_commentsItem {
  position: relative;
  padding: 15px 0 15px 56px;
  border-top: 1px solid #ededed;
}
.song_commentsItem_avatar {
  width: 38px;
  height: 38px;
  position: absolute;
  left: 0;
  top: 18px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
  }
}
.song_commentsItem_nickname {
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.song_commentsItem_info {
  display: flex;
  justify-content: space-between;
}
.song_commentsItem_date {
  color: #999;
  height: 20px;
  line-height: 20px;
}
.song_commentsItem_like {
  display: flex;
  width: 80px;
}
.comments_sprite {
  width: 17px;
  height: 17px;
  margin-right: 5px;
}
.comment_like {
  background-position: -25px -25px;
}
.song_commentsItem_cont {
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 24px;
  text-align: justify;
}
.song_comments_page {
  display: flex;
  justify-content: flex-end;
}
</style>
