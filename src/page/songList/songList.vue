<template>
  <div class="contentArea"></div>
</template>

<script>
import useSongList from './useSongList';
export default {
  setup() {
    return {
      ...useSongList()
    };
  }
};
</script>

<style lang="less" scoped></style>
