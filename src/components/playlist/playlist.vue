<template>
  <div class="playlist_box" @click.stop>
    <div class="playlist_top">
      <h4>播放列表（{{ playList.length }}）</h4>
      <div class="h-r">
        <div class="playlist_btn" @click="clearList">
          <cxj-icon class="icon_clear" />
          清空列表
        </div>
        <cxj-icon class="icon_close" @click.stop="hideList" />
      </div>
    </div>
    <div class="playlist_con mt20 scrollbar">
      <template v-if="playList.length > 0">
        <div
          class="playlist_item"
          v-for="(item, index) in playList"
          :key="item.id"
          :class="{ active: isPlaying && index == currentIndex }"
        >
          <div class="playlist_idx">
            {{ index + 1 }}
          </div>
          <div class="song_name ellipsis ml10" :title="item.name">
            {{ item.name }}
          </div>
          <div class="song_opt ml20">
            <div
              v-show="!(isPlaying && index == currentIndex)"
              class="list_menu_sprite list_menu_play"
              title="播放"
              @click="play(index)"
            ></div>
            <div
              v-show="isPlaying && index == currentIndex"
              class="list_menu_sprite list_menu_pause"
              title="暂停"
              @click="pause(index)"
            ></div>
          </div>
          <div
            class="artist ellipsis"
            :title="item.singer.map(item => item.name).join('/')"
          >
            <template v-for="(art, i) in item.singer" :key="art.id">
              {{ i == 0 ? '' : ' /' }}
              <a :href="`/artist?id=${art.id}`">{{ art.name }}</a>
            </template>
          </div>
          <div class="time ml20">{{ item.formatDur }}</div>
          <div
            class="list_menu_sprite list_menu_delete ml20"
            title="删除"
            @click="remove(index)"
          ></div>
        </div>
      </template>
      <div v-else class="playlist_con_text">啥也妹有啊！快去添加歌曲吧！</div>
    </div>
  </div>
</template>

<script setup>
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
import useMusicStore from '@/store/modules/music';
import { computed, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['hide']);

const useMusic = useMusicStore();
const playList = computed(() => useMusic.playList);
const currentIndex = computed(() => useMusic.currentIndex);
const isPlaying = computed(() => useMusic.isPlaying);

// 隐藏播放列表
const hideList = () => {
  emit('hide');
};

// 播放
const play = index => {
  useMusic.currentIndex = index;
  useMusic.isPlaying = true;
  // store.commit('setCurrentIndex', index);
  // store.commit('setIsPlaying', true);
};

// 暂停
const pause = () => {
  if (!isPlaying.value) return;
  useMusic.isPlaying = false;
  // store.commit('setIsPlaying', false);
};

// 移除播放列表中指定歌曲
const remove = index => {
  let list = clone(playList.value);
  list.splice(index, 1);
  useMusic.playList = list;
  // store.commit('setPlayList', list);
};

// 清空播放列表
const clearList = () => {
  useMusic.playList = [];
  useMusic.currentIndex = -1;
  // store.commit('setPlayList', []);
  // store.commit('setCurrentIndex', -1);
  pause();
};

onMounted(() => {
  document.addEventListener('click', hideList); // 全局点击时，关闭播放列表弹窗
});

onUnmounted(() => {
  document.removeEventListener('click', hideList);
});

// export default {
//   components: { cxjIcon },
//   setup(props, context) {
//     return {
//       format,
//       ...usePlayList(context)
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.playlist_box {
  width: 540px;
  height: 280px;
  background-color: rgba(25, 25, 25, 1);
  color: #bdbdbe;
  padding: 25px 0 23px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.playlist_top {
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  .h-r {
    display: flex;
  }
  .playlist_btn {
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
      color: #fff;
      .icon_clear {
        opacity: 1;
      }
    }
  }
}
.playlist_con {
  height: 230px;
  overflow-y: scroll;
  .playlist_con_text {
    text-align: center;
    line-height: 230px;
    user-select: none;
  }
}
.icon_clear {
  opacity: 0.8;
  width: 17px;
  height: 17px;
  background-position: -40px -300px;
  margin-right: 5px;
}
.icon_close {
  opacity: 0.8;
  width: 20px;
  height: 20px;
  background-position: -37px -197px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.playlist_item {
  display: flex;
  align-items: center;
  padding: 0 25px;
  height: 46px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    .song_opt .list_menu_play,
    .song_opt .list_menu_pause,
    .list_menu_delete {
      display: block;
    }
    .time {
      display: none;
    }
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    .playlist_idx {
      width: 25px;
      height: 10px;
      background: url('@/assets/img/wave.gif') center 0 no-repeat;
      text-indent: -9999px;
    }
  }

  .playlist_idx {
    position: relative;
    width: 25px;
    text-align: center;
  }
  .song_opt {
    flex: 1;
    .list_menu_sprite {
      display: none;
      width: 36px;
      height: 36px;
    }
    .list_menu_play {
      background-position: -80px 0;
      &:hover {
        background-position: -120px 0;
      }
    }
    .list_menu_pause {
      background-position: -80px -200px;
      &:hover {
        background-position: -120px -200px;
      }
    }
  }
  .song_name,
  .artist {
    flex: 2;
  }
  .list_menu_delete {
    display: none;
    width: 36px;
    height: 36px;
    background-position: -80px -160px;
    &:hover {
      background-position: -120px -160px;
    }
  }
}
</style>
