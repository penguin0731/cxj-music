<template>
  <div class="player_wrapper">
    <div class="player_box">
      <div class="player_sprite player_prev" title="alt+←" @click="prev"></div>
      <div
        class="player_sprite"
        title="[空格]"
        :class="{ player_pause: isPlaying, player_play: !isPlaying }"
        @click="play($event)"
      ></div>
      <div class="player_sprite player_next" title="alt+→" @click="next"></div>
      <div
        class="player_pic"
        :style="{
          backgroundImage: `url(${currentIndex == -1 ? album : curMusic.image})`
        }"
      ></div>
      <div
        class="player_music_box"
        :class="[currentIndex == -1 ? 'disabled' : '']"
      >
        <div v-if="currentIndex == -1">欢迎使用cxj-music播放器</div>
        <div v-else class="player_info">
          <a
            :href="`/#/song?id=${curMusic.id}`"
            class="player_info_name ellipsis"
          >
            {{ curMusic.name }}
          </a>
          -
          <div
            class="player_info_singers ellipsis"
            :title="curMusic.singer.map(item => item.name).join('/')"
          >
            <template v-for="(art, i) in curMusic.singer" :key="art.id">
              {{ i == 0 ? '' : ' /' }}
              <a :href="`/#/artist?id=${art.id}`">{{ art.name }}</a>
            </template>
          </div>
        </div>

        <div v-if="currentIndex != -1" class="player_time">
          {{ format(currentTime) }} / {{ curMusic.formatDur }}
        </div>
        <div class="cxjProgress_wrapper">
          <cxj-progress
            :isMouseDown="isMouseDown"
            :percent="percent"
            :loadPercent="loadPercent"
            @changeMouseDownVal="changeMouseDownVal"
            @changeProgress="changeProgress"
            @changeProgressEnd="changeProgressEnd"
          />
        </div>
      </div>
      <div
        class="player_sprite playMode"
        :title="`${getModeEnum().title}[O]`"
        :class="getModeEnum().className"
        @click="setMode"
      ></div>
      <div
        class="player_voice_box"
        :class="[currentIndex == -1 ? 'disabled' : '']"
      >
        <div
          class="player_sprite player_voice"
          title="关闭声音[M]"
          :class="{ player_isMute: isMute }"
          @click="setIsMute"
        ></div>
        <volume :volume="volume" @changeVolume="changeVolume" />
      </div>
      <div
        class="player_playList_icon"
        title="播放列表[P]"
        @click.stop="showPlayList"
      >
        <svg
          t="1616503229598"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5891"
          width="23"
          height="23"
        >
          <path
            d="M20.992 219.428571h726.016c11.593143 0 20.992-10.203429 20.992-22.784V132.498286C768 119.954286 758.601143 109.714286 747.008 109.714286H20.992C9.398857 109.714286 0 119.917714 0 132.498286v64.146285C0 209.188571 9.398857 219.428571 20.992 219.428571M21.540571 548.571429H600.137143c11.922286 0 21.540571-10.203429 21.540571-22.784v-64.146286c0-12.580571-9.618286-22.784-21.540571-22.784H21.577143c-11.922286 0-21.540571 10.203429-21.540572 22.784v64.146286c0 12.580571 9.618286 22.784 21.540572 22.784M415.890286 768H22.966857c-12.690286 0-22.966857 11.776-22.966857 26.331429v57.051428c0 14.555429 10.276571 26.331429 22.966857 26.331429h392.923429c12.690286 0 22.966857-11.776 22.966857-26.331429v-57.051428c0-14.555429-10.276571-26.331429-22.966857-26.331429M1002.057143 219.538286c-107.812571 10.678857-194.304 99.510857-195.949714 211.456h-0.036572V615.936a180.297143 180.297143 0 0 0-79.213714-18.139429c-99.072 0-178.285714 78.445714-178.285714 176.530286S627.785143 950.857143 726.857143 950.857143c99.035429 0 181.577143-78.445714 178.249143-176.530286v-340.077714c0-59.611429 43.885714-108.251429 101.558857-116.48A20.004571 20.004571 0 0 0 1024 298.057143V239.323429a19.968 19.968 0 0 0-21.942857-19.785143"
            p-id="5892"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
      <div v-show="isShowList" class="player_playlist_wrapper">
        <play-list @hide="hideList" />
      </div>
    </div>
    <audio ref="cxjPlayer"></audio>
  </div>
</template>

<script setup>
import album from '@/assets/img/album.png';
import { format } from '@/utils/song.js';
import CxjProgress from '@/baseComponents/cxj-progress/cxj-progress.vue';
import Volume from '@/components/volume/volume.vue';
import PlayList from '@/components/playlist/playlist.vue';
import useMusicStore from '@/store/modules/music';
import { useRouter } from 'vue-router';
import {
  computed,
  onMounted,
  ref,
  watch,
  watchEffect,
  watchPostEffect
} from 'vue';
import { defaultVolume, playMode } from '@/config.js';

const useMusic = useMusicStore();
const router = useRouter();
const cxjPlayer = ref(); // radio元素
const volume = ref(defaultVolume);
const mode = computed(() => useMusic.mode);
const isMute = computed(() => useMusic.isMute);
const isPlaying = computed(() => useMusic.isPlaying);
const curMusic = computed(() => playList.value[currentIndex.value] || {});
const currentIndex = computed(() => useMusic.currentIndex);
const playList = computed(() => useMusic.playList);
const currentTime = computed(() => useMusic.currentTime); // 当前播放时间
const percent = ref(0); // 播放进度
const loadPercent = ref(0); // 缓存进度
const isMouseDown = computed(() => useMusic.isMouseDown); // 鼠标是否在音乐进度条中按下
const isShowList = ref(false); // 是否显示播放列表

// 播放暂停功能
const play = () => {
  if (currentIndex.value == -1) return;
  useMusic.isPlaying = !isPlaying.value;
  // store.commit('setIsPlaying', !isPlaying.value);
};
// 切换播放模式
const setMode = () => {
  useMusic.setMode(mode.value + 1);
  // store.commit('setMode', mode.value + 1);
};
// 获取播放模式枚举
const getModeEnum = () => {
  return {
    [playMode.list]: {
      title: '列表循环',
      className: 'playMode_list'
    },
    [playMode.order]: {
      title: '顺序播放',
      className: 'playMode_order'
    },
    [playMode.random]: {
      title: '随机播放',
      className: 'playMode_random'
    },
    [playMode.single]: {
      title: '单曲循环',
      className: 'playMode_single'
    }
  }[mode.value];
};
// 下一首
const next = () => {
  useMusic.currentIndex =
    currentIndex.value === playList.value.length - 1
      ? 0
      : currentIndex.value + 1;
  // if (currentIndex.value == playList.value.length - 1) {
  //   store.commit('setCurrentIndex', 0);
  // } else {
  //   store.commit('setCurrentIndex', currentIndex.value + 1);
  // }
};
// 上一首
const prev = () => {
  useMusic.currentIndex =
    currentIndex.value === 0
      ? playList.value.length - 1
      : currentIndex.value - 1;
  // if (currentIndex.value == 0) {
  //   store.commit('setCurrentIndex', playList.value.length - 1);
  // } else {
  //   store.commit('setCurrentIndex', currentIndex.value - 1);
  // }
};
// 是否静音
const setIsMute = () => {
  useMusic.isMute = !isMute.value;
  // store.commit('setIsMute', !isMute.value);
  if (isMute.value) {
    cxjPlayer.value.volume = 0;
  }
};
// 播放器键盘事件
const bindKeyupEvent = () => {
  // 禁止空格滑动页面
  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
    }
  });
  document.addEventListener('keyup', e => {
    let altKey = e.altKey;
    let code = e.code;
    console.log(e, code);
    if (altKey) {
      // 按下alt键
      switch (code) {
        case 'ArrowUp': // 增加音量
          addVolume();
          break;
        case 'ArrowDown': // 减少音量
          reduceVolume();
          break;
        case 'ArrowLeft': // 上一首
          prev();
          break;
        case 'ArrowRight': // 下一首
          next();
          break;
      }
    } else {
      switch (code) {
        case 'Space': // 播放/暂停
          play();
          break;
        case 'KeyO': // 播放模式切换
          changePlayStyle();
          break;
        case 'KeyM': // 开启/关闭声音
          setMode();
          break;
      }
    }
  });
};
// 修改音乐显示时间
const changeProgress = per => {
  useMusic.currentTime = microSecToSec(per * curMusic.value.duration);
  // store.commit('setCurrentTime', microSecToSec(per * curMusic.value.duration));
};
// 修改音乐播放时间
const changeProgressEnd = per => {
  // if(!curMusic.value.duration) return;
  cxjPlayer.value.currentTime = microSecToSec(per * curMusic.value.duration);
};

// 修改鼠标是否按下
const changeMouseDownVal = val => {
  useMusic.isMouseDown = val;
  // store.commit('setIsMouseDown', val);

  // isMouseDown.value = val;
};

// 修改音量
const changeVolume = val => {
  volume.value = val;
  cxjPlayer.value.volume = volume.value;
  useMusic.isMute = volume.value == 0;
  // store.commit('setIsMute', volume.value == 0);
};
// 增加音量
const addVolume = () => {
  let vol = (volume.value += 0.1);
  if (vol >= 1) {
    vol = 1;
  }
  changeVolume(vol);
};
// 降低音量
const reduceVolume = () => {
  let vol = (volume.value -= 0.1);
  if (vol <= 0) {
    vol = 0;
  }
  changeVolume(vol);
};

// 显示/隐藏播放列表
const showPlayList = e => {
  isShowList.value = !isShowList.value;
};

// 隐藏播放列表
const hideList = () => {
  isShowList.value = false;
};

onMounted(() => {
  bindKeyupEvent();

  useMusic.audioDom = cxjPlayer.value;
  // store.commit('setAudioDom', cxjPlayer.value);
  cxjPlayer.value.volume = volume.value;
  // 缓冲事件
  cxjPlayer.value.onprogress = () => {
    if (cxjPlayer.value.buffered.length > 0) {
      let buffered = 0;
      cxjPlayer.value.buffered.end(0);
      buffered =
        cxjPlayer.value.buffered.end(0) > curMusic.value.duration
          ? cxjPlayer.value.buffered.end(0)
          : curMusic.value.duration;
      loadPercent.value = buffered / curMusic.value.duration;
      // 缓冲进度动画
      // let loadPer = buffered / curMusic.value.duration;
      // gsap.to(loadPercent, {
      //   value: loadPer,
      //   duration: 5
      // })
    }
  };
  // 获取当前播放时间
  cxjPlayer.value.ontimeupdate = () => {
    if (!isMouseDown.value) {
      // currentTime.value = cxjPlayer.value.currentTime;

      useMusic.currentTime = cxjPlayer.value.currentTime;
      // store.commit('setCurrentTime', cxjPlayer.value.currentTime);
    }
  };
  // 播放结束事件
  cxjPlayer.value.onended = () => {
    switch (mode.value) {
      case playMode.list: // 列表循环
        next();
        break;
      case playMode.order: // 顺序循环
        if (currentIndex.value == playList.value.length - 1) {
          useMusic.isPlaying = false;
          useMusic.currentIndex = -1;
          // store.commit('setIsPlaying', false);
          // store.commit('setCurrentIndex', -1);
        } else {
          useMusic.currentIndex = currentIndex.value + 1;
          // store.commit('setCurrentIndex', currentIndex.value + 1);
        }
        break;
      case playMode.random: // 随机播放
        let index = randomIndex(playList.value.length);
        useMusic.currentIndex = index;
        // store.commit('setCurrentIndex', index);
        break;
      case playMode.single: // 单曲循环
        cxjPlayer.value.currentTime = loadPercent.value = 0;
        cxjPlayer.value.play();
        break;
    }
  };
});

watchPostEffect(() => {
  percent.value = (currentTime.value * 1000) / curMusic.value.duration;
});
// 监听播放器播放状态
watch(isPlaying, (isPlaying, oldVal) => {
  isPlaying ? cxjPlayer.value.play() : cxjPlayer.value.pause();
});
// 监听当前播放音乐
watch(curMusic, (newMusic, oldMusic) => {
  console.log('watch curMusic', newMusic);
  if (!newMusic.id) return;
  if (newMusic.id == oldMusic.id) return;
  cxjPlayer.value.src = newMusic.url;
  cxjPlayer.value.currentTime = loadPercent.value = 0;
  cxjPlayer.value.play();
});

// export default {
//   components: {
//     CxjProgress,
//     Volume,
//     PlayList
//   },
//   setup() {
//     return {
//       album,
//       format,
//       ...usePlayer()
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.player_wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 53px;
  background-color: rgb(35, 35, 35);
  display: flex;
  justify-content: center;
  color: var(--fontColor);
  z-index: 2;
}
.player_box {
  position: relative;
  width: 1080px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 7.638889%;
  .player_prev,
  .player_next {
    width: 19px;
    height: 20px;
  }
  .player_prev {
    background-position: 0 -30px;
  }
  .player_next {
    background-position: 0 -52px;
  }
  .player_play,
  .player_pause {
    margin: 0 40px;
    width: 21px;
    height: 29px;
  }
  .player_play {
    background-position: 0 0;
  }
  .player_pause {
    background-position: -30px 0;
  }
  .playMode {
    margin-right: 30px;
    width: 26px;
  }
  .playMode_list {
    height: 25px;
    background-position: 0 -205px;
  }
  .playMode_order {
    height: 20px;
    background-position: 0 -260px;
  }
  .playMode_random {
    height: 19px;
    background-position: 0 -74px;
  }
  .playMode_single {
    height: 25px;
    background-position: 0 -232px;
  }
}
.player_pic {
  width: 35px;
  height: 35px;
  margin-left: 36px;
  margin-right: 17px;
  background-image: url('@/assets/img/album.png');
  background-position: center;
  background-size: 100% 100%;
  background-color: revert;
  cursor: pointer;
}
.player_music_box {
  flex: 1;
  position: relative;
  margin-right: 36px;
  .player_info {
    width: 80%;
    display: flex;
    .player_info_name {
      max-width: 300px;
      margin-right: 5px;
    }
    .player_info_singers {
      display: inline-block;
      max-width: 220px;
      margin-left: 5px;
    }
  }

  .player_time {
    color: var(--fontColor);
    position: absolute;
    top: 0;
    right: 0;
  }
}
.player_voice_box {
  display: flex;
  align-items: center;
  margin-right: 30px;
  .player_voice {
    width: 26px;
    height: 21px;
    background-position: 0 -144px;
    margin-right: 10px;
  }
  .player_isMute {
    background-position: 0 -182px;
  }
}
.player_playList_icon {
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.player_playlist_wrapper {
  position: absolute;
  bottom: 53px;
  right: 0;
  z-index: 9;
}
.player_pic,
.player_music_box,
.player_voice_box {
  &.disabled {
    pointer-events: none;
  }
}
</style>
