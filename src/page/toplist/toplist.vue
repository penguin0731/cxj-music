<template>
  <div class="toplist_wrapper contentArea">
    <div class="toplist_hd">
      <h1>云音乐特色榜</h1>
      <div class="toplist_menulist mt20">
        <div
          class="toplist_menuitem"
          v-for="(item, index) in toplistMenu"
          :key="item.id"
          @click="changeMenu(index)"
        >
          <img
            class="toplist_menuitem__cover"
            :src="`${item.coverImgUrl}?param=150y150`"
            alt=""
          />
          <div class="toplist_menuitem__info mt10">
            <span>{{ item.name }}</span>
            <span class="updateFrequency">{{ item.updateFrequency }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="toplist_bd">
      <div class="toplist_bd__title">
        <div class="toplist_bd__titleLeft">
          <h1 class="mr20">{{ toplistMenu[curMenuIdx]?.name }}</h1>
          <cxj-button type="primary" icon="player" @click="playAll(toplist)">
            播放全部
          </cxj-button>
        </div>
        <div class="toplist_bd__titleRight">
          播放次数：{{ toggleUnits(toplistMenu[curMenuIdx]?.playCount) }}
        </div>
      </div>
      <cxj-music-table
        class="mt10"
        :columns="columns"
        :dataSource="toplist"
        rowKey="id"
      >
        <template #songValue="{ item: { row } }">
          <div class="songValue ellipsis">
            <a :href="`/song?id=${row.id}`" :title="row.name">
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
              <a :href="`/artist?id=${_ar.id}`">{{ _ar.name }}</a>
            </template>
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
    </div>
  </div>
</template>

<script setup>
import useTopList from './useTopList';
import { format } from '@/utils/song.js';
import moment from 'moment';
import { toggleUnits } from '@/utils/util';
import cxjButton from '@/baseComponents/cxj-button/cxj-button.vue';
import cxjMusicTable from '@/baseComponents/cxj-music-table/cxj-music-table.vue';
import usePlayer from '../usePlayer';
import { ref } from 'vue';
import api from '@/api';
import nProgress from 'nprogress';

const curMenuIdx = ref(0); // 当前榜单索引
const toplistMenu = ref([]); // 榜单列表
const toplist = ref([]); // 当前榜单歌曲

const { playAll } = usePlayer();
const columns = [
  {
    lable: '歌曲',
    prop: 'name',
    width: '54%',
    slotHeader: 'songLabel',
    slot: 'songValue'
  },
  {
    lable: '歌手',
    prop: 'ar',
    width: '36%',
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

// 获取所有榜单
const getTopList = async () => {
  const { list } = await api.toplist.getTopList();
  toplistMenu.value = list.splice(0, 4); // 只截取前四个榜单
};

// 获取当前榜单的歌曲列表
const getDetail = async () => {
  let id = toplistMenu.value[curMenuIdx.value]?.id;
  if (!id) return;
  const {
    playlist: { tracks }
  } = await api.songlist.getDetail(id);
  toplist.value = tracks;
};

// 切换当前榜单
const changeMenu = index => {
  curMenuIdx.value = index;
};

watchEffect(() => {
  getDetail();
});

onMounted(async () => {
  await getTopList();
  nProgress.done();
});

// export default {
//   components: {
//     cxjMusicTable,
//     cxjButton
//   },
//   setup() {
//     let columns = [
//       {
//         lable: '歌曲',
//         prop: 'name',
//         width: '54%',
//         slotHeader: 'songLabel',
//         slot: 'songValue'
//       },
//       {
//         lable: '歌手',
//         prop: 'ar',
//         width: '36%',
//         slotHeader: 'artistLabel',
//         slot: 'artistValue'
//       },
//       {
//         lable: '时长',
//         prop: 'time',
//         width: '10%',
//         slotHeader: 'timeLabel',
//         slot: 'timeValue'
//       }
//     ];
//     return {
//       format,
//       moment,
//       toggleUnits,
//       columns,
//       ...usePlayer(),
//       ...useTopList()
//     };
//   }
// };
</script>

<style lang="scss" scoped>
a:hover {
  color: initial;
  text-decoration: underline;
}
.toplist_wrapper {
  box-sizing: border-box;
  padding: 0 40px;
}
.toplist_hd {
  padding: 35px 0;
}
.toplist_menulist {
  display: flex;
  justify-content: space-between;
}
.toplist_menuitem {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .toplist_menuitem__cover {
    box-shadow: 4px 4px 3px #999;
  }
  .toplist_menuitem__info {
    display: flex;
    justify-content: space-between;
    .updateFrequency {
      color: #999;
    }
  }
}
.toplist_bd__title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .toplist_bd__titleLeft {
    display: flex;
    align-items: center;
  }
  .updateTime {
    color: #999;
  }
}
.toplist_bd__btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
