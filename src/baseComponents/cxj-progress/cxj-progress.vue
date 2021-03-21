<template>
  <div
    ref="cxjProgress"
    class="cxjProgress"
    @click="barClick"
    @mousedown="barMouseDown"
  >
    <div class="cxjProgress_inner">
      <div
        class="cxjProgress__load"
        :style="{ width: `${loadPercentInt}%` }"
      ></div>
      <div class="cxjProgress__play" :style="{ width: `${percentInt}%` }">
        <i class="player_sprite cxjProgress__dot"></i>
      </div>
    </div>
  </div>
</template>

<script>
import useProgress from "./useProgress";
export default {
  props: {
    isMouseDown: {
      type: Boolean,
    },
    percent: {
      type: Number,
      default: 0,
    },
    loadPercent: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    return {
      ...useProgress(props, context),
    };
  },
};
</script>

<style lang="less" scoped>
.cxjProgress {
  width: 100%;
  height: 8px;
  padding-top: 7px;
  cursor: pointer;
  .cxjProgress_inner {
    position: relative;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    .cxjProgress__load {
      width: 90%;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.2);
    }
    .cxjProgress__play {
      height: 2px;
      background-color: rgba(255, 255, 255, 0.7);
      position: absolute;
      top: 0;
      left: 0;
      .cxjProgress__dot {
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
}
</style>