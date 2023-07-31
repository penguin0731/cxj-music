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

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  isMouseDown: {
    type: Boolean
  },
  percent: {
    type: Number,
    default: 0
  },
  loadPercent: {
    type: Number,
    default: 0
  }
});
const emit = defineEmits([
  'changeProgress',
  'changeProgressEnd',
  'changeMouseDownVal'
]);

const cxjProgress = ref();
const percentInt = computed(() => props.percent * 100);
const loadPercentInt = computed(() => props.loadPercent * 100);
const isMouseDown = ref(false);
watchEffect(() => {
  isMouseDown.value = props.isMouseDown;
});

/**
 * 修改percent
 * @param {*} e
 * @param {*} isEnd true修改音乐播放时间，false修改音乐显示时间
 */
const changePercent = (e, isEnd = false) => {
  let x = e.x; // 鼠标点击的坐标x
  let left = cxjProgress.value.getBoundingClientRect().left; // 进度条左侧到窗口左侧的距离
  let width = cxjProgress.value.clientWidth; // 进度条的宽度
  let per = (x - left) / width;
  if (per < 0) {
    per = 0;
  } else if (per > 1) {
    per = 1;
  }
  emit(isEnd ? 'changeProgressEnd' : 'changeProgress', per);
};
/**
 * 进度条点击事件
 * @param {*} e 事件源对象
 */
const barClick = e => {
  changePercent(e);
  changePercent(e, true);
};
// 进度条鼠标按下事件
const barMouseDown = () => {
  emit('changeMouseDownVal', true);
};
/**
 * 进度条鼠标移动事件
 * @param {*} e
 * @returns
 */
const barMouseMove = e => {
  if (!isMouseDown.value) return;
  changePercent(e);
};
/**
 * 进度条鼠标抬起事件
 * @param {*} e
 */
const barMouseUp = e => {
  if (!isMouseDown.value) return;
  changePercent(e, true);
  emit('changeMouseDownVal', false);
};
// 绑定鼠标事件
const bindMouseEvent = () => {
  document.addEventListener('mousemove', barMouseMove);
  document.addEventListener('mouseup', barMouseUp);
};
// 解绑鼠标事件
const unbindMouseEvent = () => {
  document.removeEventListener('mousemove', barMouseMove);
  document.removeEventListener('mouseup', barMouseUp);
};
onMounted(() => {
  bindMouseEvent();
});
onBeforeUnmount(() => {
  unbindMouseEvent();
});

</script>

<style lang="scss" scoped>
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
