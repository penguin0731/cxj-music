import { ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';

export default function (props, { emit }) {
  let volumePercent = ref(0);
  let isMouseDown = ref(false);

  watchEffect(() => {
    volumePercent.value = props.volume;
  });

  const changeProgress = per => {
    emit('changeVolume', per);
  };

  const changeMouseDownVal = val => {
    isMouseDown.value = val;
  };

  return {
    volumePercent,
    isMouseDown,
    changeProgress,
    changeMouseDownVal
  };
}
