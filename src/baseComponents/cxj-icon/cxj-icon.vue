<template>
  <i
    class="cxjIcon"
    :class="{
      icon_sprite: type == 'icon',
      player_sprite: type == 'player'
    }"
  ></i>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'icon'
    },
    icon: {
      type: String
    }
  },
  setup(props) {
    return {
      ...props
    };
  }
};
</script>

<style lang="scss" scoped>
.cxjIcon {
  display: inline-block;
}
</style>
