<template>
  <div class="player-wrapper">
    <div class="player-box">
      <div class="player_sprite player_prev" title="alt+←"></div>
      <div class="player_sprite player_play" title="[空格]"></div>
      <div class="player_sprite player_next" title="alt+→"></div>
      <div class="player_music_box">
        <div class="player_info">
          <span>MORE</span>
          -
          <span>K/DA</span>
        </div>
        <div class="player_time">02:56 / 03:18</div>
        <div class="player_progress">
          <div class="player_progress_inner"></div>
        </div>
      </div>
      <a class="player_sprite playStyle_list" title="列表循环[O]"></a>
      <div class="player_voice_box">
        <div class="player_sprite player_voice" title="关闭声音[M]"></div>
        <div class="player_voice_progress">
          <div class="player_voice_progress_inner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
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
  .player_prev {
    width: 19px;
    height: 20px;
    background-position: 0 -30px;
  }
  .player_play {
    margin: 0 46px;
    width: 21px;
    height: 29px;
    background-position: 0 0;
  }
  .player_pause {
    margin: 0 46px;
    width: 21px;
    height: 29px;
    background-position: -30px 0;
  }
  .player_next {
    width: 19px;
    height: 20px;
    background-position: 0 -52px;
  }
  .playStyle_list {
    margin-right: 46px;
    width: 26px;
    height: 25px;
    background-position: 0 -205px;
  }
}
.player_music_box {
  flex: 1;
  position: relative;
  margin: 0 46px;

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
    .player_progress_inner {
      height: 2px;
      background-color: rgba(255, 255, 255, 0.2);
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
  .player_voice_progress {
    width: 80px;
    height: 3px;
    padding: 2px 0;
    cursor: pointer;
    .player_voice_progress_inner {
      height: 2px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>