<template>
  <div class="cxjSearch_box">
    <input type="text" placeholder="音乐/歌手/专辑/用户" />
    <button class="cxjSearch_btn">
      <cxj-icon class="icon_search" />
    </button>
  </div>
</template>

<script setup>
import cxjIcon from '../cxj-icon/cxj-icon.vue';

</script>

<style lang="scss" scoped>
.cxjSearch_box {
  display: flex;
  position: relative;
  height: 36px;
  line-height: 36px;
  background-color: #fff;
  border-radius: 3px;
  padding: 0 33px 0 11px;
  input {
    width: 170px;
    height: 36px;
    border: none;
    outline: none;
  }
  button {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -16px;
    width: 32px;
    height: 32px;
    border: none;
    background-color: #fff;
    &:hover {
      cursor: pointer;
    }
    .icon_search {
      position: absolute;
      top: 50%;
      right: 50%;
      margin-top: -8px;
      margin-right: -8px;
      width: 16px;
      height: 16px;
      background-position: 0 -40px;
    }
  }
}
</style>
