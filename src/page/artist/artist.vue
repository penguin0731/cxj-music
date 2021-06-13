<template>
  <div class="artist_wrapper contentArea">
    <div class="artist_header">
      <img class="artist_cover" :src="`${cover}?param=250y250`" alt="" />
      <div class="artist_cont">
        <h1 class="artist_name">{{ name }}</h1>
        <div class="artist_desc">
          <div class="artist_desc_txt ellipsis" :title="desc">{{ desc }}</div>
        </div>
        <div class="artist_statistic">
          <div class="artist_statistic_item">
            <div class="artist_statistic__tit">单曲</div>
            <div class="artist_statistic__num">{{ musicSize }}</div>
          </div>
          <div class="artist_statistic_item">
            <div class="artist_statistic__tit">专辑</div>
            <div class="artist_statistic__num">{{ albumSize }}</div>
          </div>
          <div class="artist_statistic_item">
            <div class="artist_statistic__tit">MV</div>
            <div class="artist_statistic__num">{{ mvSize }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useArtist from './useArtist';
export default {
  setup() {
    return {
      ...useArtist()
    };
  }
};
</script>

<style lang="less" scoped>
.artist_header {
  position: relative;
  height: 250px;
  padding-top: 40px;
  padding-bottom: 35px;
  padding-left: 335px;
}
.artist_cover {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  border-radius: 50%;
}
.artist_cont {
  padding-top: 30px;
  .artist_name {
    font-size: 38px;
    font-weight: 400;
  }
  .artist_desc {
    height: 50px;
    .artist_desc_txt {
      max-width: 80%;
    }
  }
  .artist_name,
  .artist_desc {
    line-height: 50px;
  }
  .artist_statistic {
    display: flex;
    .artist_statistic_item {
      display: flex;
      align-items: center;
      padding-right: 20px;
      margin-right: 20px;
      font-size: 18px;
      border-right: 1px solid #c9c9c9;
      &:last-of-type {
        border-right: none;
      }
      &:hover {
        cursor: pointer;
        color: var(--themeColor);
      }
      .artist_statistic__num {
        font-size: 25px;
        font-weight: 400;
        margin-left: 10px;
      }
    }
  }
}
</style>
