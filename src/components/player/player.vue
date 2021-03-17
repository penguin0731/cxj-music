<template>
  <div class="player-wrapper">
    <div class="player-box">
      <div class="player_sprite player_prev" title="alt+←"></div>
      <div
        class="player_sprite"
        title="[空格]"
        :class="{ player_pause: isPlaying, player_play: !isPlaying }"
        @click="play($event)"
      ></div>
      <div class="player_sprite player_next" title="alt+→"></div>
      <div class="player_pic" :style="{backgroundImage: `url('https://p2.music.126.net/CaFZORZOOdE3acaCqMxn2Q==/109951163861068723.jpg')`}"></div>
      <div class="player_music_box">
        <div class="player_info">
          <span>POP/STARS</span>
          -
          <span>K/DA</span>
        </div>
        <div class="player_time">{{ format(currentTime) }} / {{ format(duration) }}</div>
        <div class="player_progress" ref="progress" @click="barClick">
          <div class="player_progress_inner">
            <div class="player_progress__load" :style="{width: `${loadProgress}%`}"></div>
            <div class="player_progress__play" :style="{width: `${percent}%`}">
              <i class="player_sprite player_progress__dot"></i>
            </div>
          </div>
        </div>
      </div>
      <a
        class="player_sprite playStyle"
        :title="
          mode == 0
            ? '列表循环[O]'
            : mode == 1
            ? '顺序播放[O]'
            : mode == 2
            ? '随机播放[O]'
            : '单曲循环[O]'
        "
        :class="{
          playStyle_list: mode == 0,
          playStyle_order: mode == 1,
          playStyle_single: mode == 2,
          playStyle_random: mode == 3,
        }"
        @click="changePlayStyle"
      ></a>
      <div class="player_voice_box">
        <div
          class="player_sprite player_voice"
          title="关闭声音[M]"
          :class="{ player_voice_no: !voice }"
          @click="changeVoice"
        ></div>
        <div class="player_voice_progress" title="调节音量 [增大alt+↑][减小alt+↓]">
          <div class="player_progress_inner">
            <div class="player_progress__play" :style="{width: '70%'}">
              <i class="player_sprite player_progress__dot"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio ref="cxjPlayer"></audio>
  </div>
</template>

<script>
import { format } from '@/utils/util.js'
import usePlayer from "./usePlayer";

export default {
  setup() {
    return {
      format,
      ...usePlayer(),
    };
  },
};
</script>

<style lang="less" scoped>
.player-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 53px;
  background-color: var(--themeColor2);
  opacity: 0.9;
  display: flex;
  justify-content: center;
  color: #bdbdbe;
}
.player-box {
  width: 1080px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 7.638889%;
  span {
    cursor: pointer;
    color: #bdbdbe;
    &:hover {
      color: #fff;
    }
  }
  .player_prev, .player_next {
    width: 19px;
    height: 20px;
  }
  .player_prev {
    background-position: 0 -30px;
  }
  .player_next {
    background-position: 0 -52px;
  }
  .player_play, .player_pause {
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
  .playStyle {
    margin-right: 30px;
    width: 26px;
  }
  .playStyle_list {
    height: 25px;
    background-position: 0 -205px;
  }
  .playStyle_order {
    height: 20px;
    background-position: 0 -260px;
  }
  .playStyle_random {
    height: 19px;
    background-position: 0 -74px;
  }
  .playStyle_single {
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

  .player_time {
    color: #bdbdbe;
    position: absolute;
    top: 0;
    right: 0;
  }
  .player_progress {
    width: 100%;
    height: 8px;
    padding-top: 7px;
    cursor: pointer;
  }
}
.player_progress_inner {
  position: relative;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  .player_progress__load {
    width: 90%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .player_progress__play {
    height: 2px;
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    .player_progress__dot {
      width: 10px;
      height: 10px;
      background-position: 0 -170px;
      position: absolute;
      top: -4px;
      right: -4px;
      opacity: 1;
    }
  }
}
.player_voice_box {
  display: flex;
  align-items: center;
  .player_voice {
    width: 26px;
    height: 21px;
    background-position: 0 -144px;
    margin-right: 6px;
  }
  .player_voice_no {
    background-position: 0 -182px;
  }
  .player_voice_progress {
    width: 80px;
    height: 3px;
    padding: 2px 0;
    cursor: pointer;
  }
}
</style>
