<template>
  <div class="artistlist_wrapper contentArea">
    <ul class="tag_en">
      <li
        v-for="item in enEntries"
        :key="item[0]"
        :class="{ active: curEn === item[1] }"
        @click="changeEn(item[1])"
      >
        {{ item[0] }}
      </li>
    </ul>
    <ul class="tag_type mt10">
      <li
        v-for="item in getListTypeEntries"
        :key="item[0]"
        :class="{ active: curType === item[1] }"
        @click="changeType(item[1])"
      >
        {{ item[0] }}
      </li>
    </ul>
    <ul class="tag_area mt10">
      <li
        v-for="item in getListAreaEntries"
        :key="item[0]"
        :class="{ active: curArea === item[1] }"
        @click="changeArea(item[1])"
      >
        {{ item[0] }}
      </li>
    </ul>
    <ul class="artists mt10">
      <li
        v-for="(item, index) in artists"
        :key="item.id"
        class="artists_item mt10"
      >
        <img v-if="index < 10" :src="`${item.picUrl}?param=164y164`" alt="" />
        <a :href="`/#/artist?id=${item.id}`">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import useArtistList from './useArtistList';
export default {
  setup() {
    return {
      ...useArtistList()
    };
  }
};
</script>

<style lang="less" scoped>
.artistlist_wrapper {
  box-sizing: border-box;
  padding: 35px 40px;
  position: relative;
}
.tag_en,
.tag_type,
.tag_area {
  display: flex;
}
.tag_en li {
  height: 28px;
  margin-right: 8px;
  text-align: center;
  line-height: 28px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0 5px;
  &:first-child {
    border-radius: 14px;
  }
  &.active {
    background: var(--themeColor);
    font-weight: 700;
    color: #fff;
    padding: 0 10px;
  }
}
.tag_type li,
.tag_area li {
  padding: 5px 10px;
  text-align: center;
  border-radius: 14px;
  cursor: pointer;
  margin-right: 6px;
  &.active {
    background: var(--themeColor);
    font-weight: 700;
    color: #fff;
  }
}
.artists {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.artists_item {
  width: 164px;
  display: flex;
  flex-direction: column;
  a {
    &:hover {
      color: var(--themeColor);
    }
  }
}
</style>
