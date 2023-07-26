<template>
  <div class="songlistDetail_wrapper contentArea">
    <div class="songlistDetail_hd">
      <img
        class="songlistDetail_cover"
        :src="`${playlist.coverImgUrl}?param=200y200`"
        alt=""
      />
      <div class="songlistDetail_cont">
        <h1 class="songlistDetail_name">{{ playlist.name }}</h1>
        <div class="songlistDetail_creator mt10">
          <cxj-icon class="icon_singer mr10" />
          <a :href="`/#/user?id=${playlist.creator?.userId}`">
            {{ playlist.creator?.nickname }}
          </a>
          <span class="ml20">
            创建时间：{{ moment(playlist.publishTime).format('YYYY-MM-DD') }}
          </span>
        </div>
        <ul class="songlistDetail_info mt10">
          <li class="songlistDetail_info__item mt10">
            标签：
            <template v-for="(tag, i) in playlist.tags" :key="tag">
              <a
                class="tag"
                :class="{ ml10: i !== 0 }"
                :href="`/#/music/songlist`"
              >
                {{ tag }}
              </a>
            </template>
          </li>
          <li class="songlistDetail_info__item mt10">
            介绍：
            <span>{{ playlist.description }}</span>
          </li>
        </ul>
        <div class="songlistDetail_actions mt10">
          <cxj-button type="primary" icon="player" @click="play">
            播放
          </cxj-button>
          <cxj-button icon="comment">
            评论({{ playlist.commentCount }})
          </cxj-button>
        </div>
      </div>
    </div>
    <cxj-music-table
      class="mt10"
      :columns="columns"
      :dataSource="songlist"
      :menuStyle="{
        left: '30%'
      }"
      rowKey="id"
    >
      <template #songValue="{ item: { row } }">
        <div class="songValue ellipsis">
          <a :href="`/#/song?id=${row.id}`" :title="row.name">
            {{ row.name }}
          </a>
          <span
            v-if="row.alia.length > 0"
            class="alia ml10"
            :title="row.alia[0]"
          >
            {{ row.alia[0] }}
          </span>
        </div>
      </template>
      <template #artistValue="{ item: { row } }">
        <div
          class="artistValue ellipsis"
          :title="row.ar.map(_item => _item.name).join('/')"
        >
          <template v-for="(_ar, i) in row.ar" :key="_ar.id">
            {{ i == 0 ? '' : ' /' }}
            <a :href="`/#/artist?id=${_ar.id}`">{{ _ar.name }}</a>
          </template>
        </div>
      </template>
      <template #albumValue="{ item: { row } }">
        <div class="albumValue ellipsis" :title="row.al.name">
          <a :href="`/#/album?id=${row.al.id}`">{{ row.al.name }}</a>
        </div>
      </template>
      <template #timeValue="{ item: { row, $index } }">
        {{ format(row.dt, false) }}
      </template>
      <template #list_menu="{ item: { row, $index } }">
        <div
          class="list_menu_sprite icon_list_menu_play"
          title="播放"
          @click="play(row)"
        ></div>
        <div
          class="list_menu_sprite icon_list_menu_add ml10"
          title="添加到播放列表"
          @click="add(row)"
        ></div>
      </template>
    </cxj-music-table>
    <comments
      v-show="comment.total > 0"
      class="mt40"
      :hotComments="comment.hotComments"
      :comments="comment.comments"
      :total="comment.total"
      :currentPage="commentPage"
    />
    <div class="song_page">
      <cxj-page
        v-show="comment.total > 0"
        :total="comment.total"
        :currentPage="commentPage"
        @currentChange="changeCommentPage"
      />
    </div>
  </div>
</template>

<script>
import useSongListDetail from './useSongListDetail';
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
import cxjButton from '@/baseComponents/cxj-button/cxj-button.vue';
import cxjMusicTable from '@/baseComponents/cxj-music-table/cxj-music-table.vue';
import comments from '@/components/comments/comments.vue';
import cxjPage from '@/baseComponents/cxj-page/cxj-page.vue';
import { format } from '@/utils/song.js';
import moment from 'moment';
import usePlayer from '../usePlayer';
export default {
  components: {
    cxjIcon,
    cxjButton,
    cxjMusicTable,
    comments,
    cxjPage
  },
  setup() {
    let columns = [
      {
        lable: '歌曲',
        prop: 'name',
        width: '40%',
        slotHeader: 'songLabel',
        slot: 'songValue'
      },
      {
        lable: '歌手',
        prop: 'ar',
        width: '25%',
        slotHeader: 'artistLabel',
        slot: 'artistValue'
      },
      {
        lable: '专辑',
        prop: 'ar',
        width: '25%',
        slotHeader: 'artistLabel',
        slot: 'artistValue'
      },
      {
        lable: '时长',
        prop: 'time',
        width: '10%',
        slotHeader: 'timeLabel',
        slot: 'timeValue'
      }
    ];
    return {
      moment,
      format,
      columns,
      ...usePlayer(),
      ...useSongListDetail()
    };
  }
};
</script>

<style lang="scss" scoped>
a:hover {
  color: inherit;
}
.songlistDetail_wrapper {
  box-sizing: border-box;
  padding: 0 40px;
  position: relative;
}
.songlistDetail_hd {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
}
.songlistDetail_cover {
  width: 22.5%;
  img {
    width: 100%;
    height: 100%;
  }
}
.songlistDetail_cont {
  width: 70%;
  position: relative;
  .songlistDetail_creator {
    a {
      font-size: 18px;
      height: 25px;
      color: #666;
      line-height: 25px;
    }
  }
  .songlistDetail_info {
    width: 520px;
    .songlistDetail_info__item {
      .tag:hover {
        color: var(--themeColor);
      }
    }
  }
  .songlistDetail_actions {
    display: flex;
  }
}

.songValue,
.artistValue {
  max-width: 60%;
}
.alia {
  color: #aeaeae;
}
.list_menu_sprite {
  width: 36px;
  height: 36px;
}
.icon_list_menu_play {
  background-position: 0 0;
}
.icon_list_menu_add {
  background-position: 0 -80px;
}
.song_page {
  display: flex;
  justify-content: flex-end;
}
</style>
