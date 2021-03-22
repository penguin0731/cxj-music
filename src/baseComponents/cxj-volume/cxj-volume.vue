<template>
  <div class="player_voice_progress" title="调节音量 [增大alt+↑][减小alt+↓]">
    <cxj-progress
      :percent="volumePercent"
      :isMouseDown="isMouseDown"
      @changeProgress="changeProgress"
      @changeMouseDownVal="changeMouseDownVal"
    />
  </div>
</template>

<script>
import useVolume from "./useVolume";
import cxjProgress from "../cxj-progress/cxj-progress.vue";
export default {
  components: { cxjProgress },
  props: {
    volume: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    return {
      ...useVolume(props, context),
    };
  },
};
</script>

<style lang="less" scoped>
.player_isMute {
  background-position: 0 -182px;
}
.player_voice_progress {
  width: 80px;
  cursor: pointer;
}
</style>