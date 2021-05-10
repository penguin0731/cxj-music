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
          backgroundImage: `url(${currentIndex == -1 ? album : curMusic.image})`,
        }"
      ></div>
      <div class="player_music_box" :class="[currentIndex == -1 ? 'disabled' : '']">
        <div v-if="currentIndex == -1">欢迎使用cxj-music播放器</div>
        <div v-else class="player_info">
          <a :href="`/#/song?id=${curMusic.id}`" class="player_info_name ellipsis">{{ curMusic.name }}</a>
          -
          <div class="player_info_singers ellipsis" :title="curMusic.singer.map(item => item.name).join('/')">
            <template v-for="(art, i) in curMusic.singer" :key="art.id">
              {{ i == 0 ? '' : ' /' }}
              <a>{{ art.name }}</a>
            </template>
          </div>
        </div>
        
        <div v-if="currentIndex != -1" class="player_time">
          {{ format(currentTime) }} / {{ format(curMusic.duration) }}
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
      <div class="player_voice_box" :class="[currentIndex == -1 ? 'disabled' : '']">
        <div
          class="player_sprite player_voice"
          title="关闭声音[M]"
          :class="{ player_isMute: isMute }"
          @click="setIsMute"
        ></div>
        <volume :volume="volume" @changeVolume="changeVolume" />
      </div>
      <div class="player_playList_icon" title="播放列表[P]" @click.stop="showPlayList">
        <svg t="1616503229598" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5891" width="23" height="23"><path d="M20.992 219.428571h726.016c11.593143 0 20.992-10.203429 20.992-22.784V132.498286C768 119.954286 758.601143 109.714286 747.008 109.714286H20.992C9.398857 109.714286 0 119.917714 0 132.498286v64.146285C0 209.188571 9.398857 219.428571 20.992 219.428571M21.540571 548.571429H600.137143c11.922286 0 21.540571-10.203429 21.540571-22.784v-64.146286c0-12.580571-9.618286-22.784-21.540571-22.784H21.577143c-11.922286 0-21.540571 10.203429-21.540572 22.784v64.146286c0 12.580571 9.618286 22.784 21.540572 22.784M415.890286 768H22.966857c-12.690286 0-22.966857 11.776-22.966857 26.331429v57.051428c0 14.555429 10.276571 26.331429 22.966857 26.331429h392.923429c12.690286 0 22.966857-11.776 22.966857-26.331429v-57.051428c0-14.555429-10.276571-26.331429-22.966857-26.331429M1002.057143 219.538286c-107.812571 10.678857-194.304 99.510857-195.949714 211.456h-0.036572V615.936a180.297143 180.297143 0 0 0-79.213714-18.139429c-99.072 0-178.285714 78.445714-178.285714 176.530286S627.785143 950.857143 726.857143 950.857143c99.035429 0 181.577143-78.445714 178.249143-176.530286v-340.077714c0-59.611429 43.885714-108.251429 101.558857-116.48A20.004571 20.004571 0 0 0 1024 298.057143V239.323429a19.968 19.968 0 0 0-21.942857-19.785143" p-id="5892" fill="#ffffff"></path></svg>
      </div>
      <div v-show="isShowList" class="player_playlist_wrapper">
        <play-list @hide="hideList" />
      </div>
    </div>
    <audio ref="cxjPlayer"></audio>
  </div>
</template>

<script>
import album from "@/assets/img/album.png"
import { format } from "@/utils/util.js"
import usePlayer from "./usePlayer"
import CxjProgress from "@/baseComponents/cxj-progress/cxj-progress.vue"
import Volume from "@/components/volume/volume.vue"
import PlayList from "@/components/playlist/playlist.vue"


export default {
  components: {
    CxjProgress,
    Volume,
    PlayList,
  },
  setup() {
    return {
      album,
      format,
      ...usePlayer(),
    };
  },
};
</script>

<style lang="less" scoped>
.player_wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 53px;
  background-color: rgb(35, 35, 35);;
  display: flex;
  justify-content: center;
  color: var(--fontColor);
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
  background-image: url("@/assets/img/album.png");
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
}
.player_pic, .player_music_box, .player_voice_box {
  &.disabled {
    pointer-events: none;
  }
}
</style>
