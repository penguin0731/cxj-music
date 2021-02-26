<template>
  <div class="header">
      <div class="logo-header">cxj-music在线音乐播放器</div>
      <div class="nav-header">
        <ul>

        </ul>
      </div>
      <div class="search-header"></div>
      <div class="user-header"></div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
export default {
  setup() {

  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  box-sizing: border-box;
  background: var(--themeColor);
}
</style>