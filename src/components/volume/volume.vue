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

<script setup>
import useVolume from './useVolume';
import CxjProgress from '@/baseComponents/cxj-progress/cxj-progress.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  volume: {
    type: Number,
    default: 0
  }
});
const emit = defineEmits(['changeVolume']);

const volumePercent = ref(0);
const isMouseDown = ref(false);

watchEffect(() => {
  volumePercent.value = props.volume;
});

const changeProgress = per => {
  emit('changeVolume', per);
};

const changeMouseDownVal = val => {
  isMouseDown.value = val;
};

// export default {
//   components: { CxjProgress },
//   props: {
//     volume: {
//       type: Number,
//       default: 0
//     }
//   },
//   emits: ['changeVolume'],
//   setup(props, context) {
//     return {
//       ...useVolume(props, context)
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.player_isMute {
  background-position: 0 -182px;
}
.player_voice_progress {
  width: 80px;
  cursor: pointer;
}
</style>
