<template>
  <div class="playlist_box">
    <div class="playlist_top">
      <h4>播放列表</h4>
      <div class="h-r">
        <div class="playlist_btn"><cxj-icon class="icon_clear" />清空列表</div>
        <cxj-icon class="icon_close" @click="hideList" />
      </div>
    </div>
    <div class="playlist_con">
      
    </div>
  </div>
</template>

<script>
import usePlayList from "./usePlayList";
import cxjIcon from "@/baseComponents/cxj-icon/cxj-icon.vue";

export default {
  components: { cxjIcon },
  setup(props, context) {

    return {
      ...usePlayList(context),
    }
  },
};
</script>

<style lang="less" scoped>
.playlist_box {
  width: 540px;
  height: 280px;
  background-color: rgba(25, 25, 25, 1);
  color: #bdbdbe;
  padding: 25px 0 23px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.playlist_top {
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  .h-r {
    display: flex;
  }
  .playlist_btn {
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
      color: #fff;
      .icon_clear {
        opacity: 1;
      }
    }
  }
}
.icon_clear {
  opacity: 0.8;
  width: 17px;
  height: 17px;
  background-position: -40px -300px;
  margin-right: 5px;
}
.icon_close {
  opacity: 0.8;
  width: 20px;
  height: 20px;
  background-position: -37px -197px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
</style>