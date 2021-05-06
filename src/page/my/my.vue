<template>
  <div v-if="Uid" class="my-wrapper">
    <div class="my-profile">
      <div v-show="userInfo.userId" class="my-profile-detail">
        <img class="my-avatar" :src="userInfo.avatarUrl" />
        <span class="my-nickname">{{ userInfo.nickname }}</span>
        <div class="my-statistic mt10">
          <div class="my-follows">
            <span>{{ userInfo.follows }}</span>
            <span>关注</span>
          </div>
          <div class="my-followeds">
            <span>{{ userInfo.followeds }}</span>
            <span>粉丝</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-main"></div>
  </div>
  <not-found v-else />
</template>

<script>
import useMy from './useMy'
import NotFound from '@/components/not-found/not-found.vue'
export default {
  components: {
    NotFound
  },
  setup() {
    return {
      ...useMy(),
    }
  }
}
</script>

<style lang="less" scoped>
.my-profile {
  height: 235px;
  padding-top: 45px;
  background-image: url('@/assets/img/bg_profile.jpg');
  background-size: cover;
  text-align: center;
  color: #fff;
  .my-profile-detail {
    width: var(--contentWidth);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    .my-avatar {
      width: 102px;
      height: 102px;
      border: 4px solid #fff;
      border-radius: 50%;
      background: #fff;
    }
    .my-nickname {
      font-size: 30px;
    }
    .my-statistic {
      display: flex;
      .my-follows, .my-followeds {
        display: flex;
        flex-direction: column;
        padding: 0 25px;
        font-family: emoji;
        color: #bdbdbe;
        cursor: pointer;
        span:first-child {
          font-size: 22px;
        }
        span:last-child {
          font-size: 14px;
        }
        &:hover span{
          color: #fff;
        }
      }
      .my-follows {
        border-right: 1px solid #24313d;
      }
    }
  }
}
.my-main {
  width: var(--contentWidth);
  min-height: 400px;
  background-color: #fff;
  margin: 0 auto;
}
</style>