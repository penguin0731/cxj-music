import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from 'vue';
export default function (props, { emit }) {
  let cxjProgress = ref(null);
  let cxjProgress__load = ref(null);
  let cxjProgress__play = ref(null);
  let percentInt = computed(() => props.percent * 100);
  let loadPercentInt = computed(() => props.loadPercent * 100);
  let isMouseDown = ref(false);
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

  return {
    cxjProgress,
    cxjProgress__load,
    cxjProgress__play,
    percentInt,
    loadPercentInt,
    barClick,
    barMouseDown,
    changePercent
  };
}
