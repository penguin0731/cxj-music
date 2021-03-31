<template>
  <teleport to="body">
    <transition name="toast-fade">
      <div v-show="visible" class="cxjToast">{{ message }}</div>
    </transition>
  </teleport>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let visible = ref(false);
    let message = ref('');
    let duration = ref(1500);

    return {
      visible,
      message,
      duration,
    }
  }
}
</script>

<style lang="less" scoped>
.cxjToast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .9);
  color: #fff;
  text-align: center;
  max-width: 80%;
  min-height: 40px;
  line-height: 20px;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 20px;
  user-select: none;
  z-index: 2000;
}

.toast-fade-enter-active {
  transition: all .3s;
}
.toast-fade-enter-from {
  opacity: 0;
  top: 45%;
}
.toast-fade-enter-to {
  opacity: 1;
  top: 50%;
}
</style>