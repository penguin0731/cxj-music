<template>
  <div class="artist_wrapper contentArea">
    <div class="artist_header">
      <img
        class="artist_cover"
        :src="`${artistDetail.img1v1Url}?param=200y200`"
        alt=""
      />
      <div class="artist_cont">
        <h1 class="artist_name">{{ artistDetail.name }}</h1>
        <div class="artist_desc">
          <div
            class="artist_desc_txt ellipsis"
            :title="artistDetail.desc || artistDetail.briefDesc"
          >
            {{ artistDetail.desc || artistDetail.briefDesc }}
          </div>
        </div>
        <div class="artist_statistic">
          <div
            class="artist_statistic_item"
            @click="changeCurType(TYPE_MAP.songs.key)"
          >
            <div class="artist_statistic__tit">{{ TYPE_MAP.songs.cn }}</div>
            <div class="artist_statistic__num">
              {{ artistDetail.musicSize }}
            </div>
          </div>
          <div
            class="artist_statistic_item"
            @click="changeCurType(TYPE_MAP.album.key)"
          >
            <div class="artist_statistic__tit">{{ TYPE_MAP.album.cn }}</div>
            <div class="artist_statistic__num">
              {{ artistDetail.albumSize }}
            </div>
          </div>
          <div
            class="artist_statistic_item"
            @click="changeCurType(TYPE_MAP.MV.key)"
          >
            <div class="artist_statistic__tit">{{ TYPE_MAP.MV.cn }}</div>
            <div class="artist_statistic__num">{{ artistDetail.mvSize }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="artist_body mt20">
      <div class="artist_body_hd">
        <h2 class="mr10">{{ TYPE_MAP[curType].cn }}</h2>
        <cxj-button
          v-if="curType == TYPE_MAP.songs.key"
          type="primary"
          icon="player"
          @click="playAll"
        >
          播放全部
        </cxj-button>
      </div>
      <div class="mt20">
        <cxj-music-table
          v-if="curType == TYPE_MAP.songs.key"
          :columns="columns"
          :dataSource="artistSongs"
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
          <template #albumValue="{ item: { row } }">
            <a
              class="albumValue ellipsis"
              :href="`/#/album?id=${row.al.id}`"
              :title="row.al.name"
            >
              {{ row.al.name }}
            </a>
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
        <albumlist
          v-if="curType == TYPE_MAP.album.key"
          :list="artistAlbum"
          :showName="false"
          :showPublishTime="true"
        />
        <mvlist v-if="curType == TYPE_MAP.MV.key" :list="artistMV" />
      </div>
    </div>
  </div>
</template>

<script>
import useArtist from './useArtist';
import cxjButton from '@/baseComponents/cxj-button/cxj-button.vue';
import cxjMusicTable from '@/baseComponents/cxj-music-table/cxj-music-table.vue';
import albumlist from '@/components/albumlist/albumlist.vue';
import mvlist from '@/components/mvlist/mvlist.vue';
import { format } from '@/utils/song';
export default {
  components: {
    cxjButton,
    cxjMusicTable,
    albumlist,
    mvlist
  },
  setup() {
    let columns = [
      {
        lable: '歌曲',
        prop: 'name',
        width: '54%',
        slotHeader: 'songLabel',
        slot: 'songValue'
      },
      {
        lable: '专辑',
        prop: 'al.name',
        width: '36%',
        slotHeader: 'albumLabel',
        slot: 'albumValue'
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
      columns,
      format,
      ...useArtist()
    };
  }
};
</script>

<style lang="less" scoped>
a:hover {
  color: initial;
  text-decoration: underline;
}
.artist_header {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px 0;
}
.artist_cover {
  width: 22.5%;
  img {
    width: 100%;
    height: 100%;
  }
}
.artist_cont {
  width: 70%;
  position: relative;
  padding-top: 20px;
  .artist_name {
    font-size: 38px;
    font-weight: 400;
  }
  .artist_desc {
    height: 50px;
    .artist_desc_txt {
      max-width: 80%;
    }
  }
  .artist_name,
  .artist_desc {
    line-height: 50px;
  }
  .artist_statistic {
    display: flex;
    .artist_statistic_item {
      display: flex;
      align-items: center;
      padding-right: 20px;
      margin-right: 20px;
      font-size: 18px;
      border-right: 1px solid #c9c9c9;
      &:last-of-type {
        border-right: none;
      }
      &:hover {
        cursor: pointer;
        color: var(--themeColor);
      }
      .artist_statistic__num {
        font-size: 25px;
        font-weight: 400;
        margin-left: 10px;
      }
    }
  }
  .artist_actions {
    display: flex;
  }
}
.artist_body {
  padding: 0 40px;
}
.artist_body_hd {
  display: flex;
  align-items: center;
}
.songValue {
  max-width: 60%;
}
.albumValue {
  display: inline-block;
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
</style>
