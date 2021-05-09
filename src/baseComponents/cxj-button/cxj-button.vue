<template>
  <div class="cxj_button" :class="`cxj_button__${type}`">
    <cxj-icon class="cxj_button_icon" :class="`icon_${icon}`" />
    <slot></slot>
  </div>
</template>

<script>
import cxjIcon from '../cxj-icon/cxj-icon.vue'
export default {
  components: { cxjIcon },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.cxj_button {
  margin-right: 6px;
  text-align: center;
  padding: 0 18px;
  min-width: 122px;
  height: 38px;
  line-height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
}
.cxj_button_icon {
  margin-right: 6px;
}
.cxj_button__default {
  background-color: transparent;
  border: 1px solid #c9c9c9;
  color: #000;
  &:hover {
    background-color: #ededed;
  }
}
.cxj_button__primary {
  background-color: var(--themeColor);
  border: 1px solid var(--themeColor);
  color: #fff;
  &:hover {
    background-color: #f20808;
    border: 1px solid #f20808;
  }
}
.icon_player {
  width: 13px;
  height: 16px;
  background-position: -80px -220px;
}
.icon_comment {
  width: 16px;
  height: 16px;
  background-position: -140px -120px;
}
</style>