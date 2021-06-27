<template>
  <div class="artist_wrapper contentArea">
    <div class="artist_header">
      <img class="artist_cover" :src="`${cover}?param=200y200`" alt="" />
      <div class="artist_cont">
        <h1 class="artist_name">{{ name }}</h1>
        <div class="artist_desc">
          <div class="artist_desc_txt ellipsis" :title="desc">{{ desc }}</div>
        </div>
        <div class="artist_statistic">
          <div
            class="artist_statistic_item"
            @click="changeCurType(typeMap.songs.key)"
          >
            <div class="artist_statistic__tit">{{ typeMap.songs.cn }}</div>
            <div class="artist_statistic__num">{{ musicSize }}</div>
          </div>
          <div
            class="artist_statistic_item"
            @click="changeCurType(typeMap.album.key)"
          >
            <div class="artist_statistic__tit">{{ typeMap.album.cn }}</div>
            <div class="artist_statistic__num">{{ albumSize }}</div>
          </div>
          <div
            class="artist_statistic_item"
            @click="changeCurType(typeMap.MV.key)"
          >
            <div class="artist_statistic__tit">{{ typeMap.MV.cn }}</div>
            <div class="artist_statistic__num">{{ mvSize }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="artist_body mt20">
      <div class="artist_body_hd">
        <h2 class="mr10">{{ typeMap[curType].cn }}</h2>
        <cxj-button
          v-if="curType == typeMap.songs.key"
          type="primary"
          icon="player"
          @click="playAll"
        >
          播放全部
        </cxj-button>
      </div>
      <div class="mt20">
        <cxj-music-table
          v-if="curType == typeMap.songs.key"
          :columns="columns"
          :dataSource="songsRef"
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
            <a class="ellipsis" :href="`/#/album?id=${row.al.id}`">
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
        <albumlist v-if="curType == typeMap.album.key" :list="albumRef" />
        <mvlist v-if="curType == typeMap.MV.key" :list="MVRef" />
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
        // width: 'calc(54% - 46px)',
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
  position: relative;
  height: 205px;
  padding-top: 20px;
  padding-bottom: 15px;
  padding-left: 280px;
  padding-right: 40px;
}
.artist_cover {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
}
.artist_cont {
  position: relative;
  padding-top: 30px;
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
