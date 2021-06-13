<template>
  <div v-if="userInfo.userId && !show404" class="my_wrapper">
    <div class="my_profile">
      <div class="my_profile_detail contentArea">
        <img class="my_avatar" :src="userInfo.avatarUrl" />
        <span class="my_nickname">{{ userInfo.nickname }}</span>
        <div class="my_statistic mt10">
          <div class="my_follows">
            <span>{{ userInfo.follows }}</span>
            <span>关注</span>
          </div>
          <div class="my_followeds">
            <span>{{ userInfo.followeds }}</span>
            <span>粉丝</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my_main contentArea"></div>
  </div>
  <not-found v-show="show404" />
</template>

<script>
import useMy from './useMy';
import NotFound from '@/components/not-found/not-found.vue';
export default {
  components: {
    NotFound
  },
  setup() {
    return {
      ...useMy()
    };
  }
};
</script>

<style lang="less" scoped>
.my_profile {
  height: 235px;
  padding-top: 45px;
  background-image: url('@/assets/img/bg_profile.jpg');
  background-size: cover;
  text-align: center;
  color: #fff;
  .my_profile_detail {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    .my_avatar {
      width: 102px;
      height: 102px;
      border: 4px solid #fff;
      border-radius: 50%;
      background: #fff;
    }
    .my_nickname {
      font-size: 30px;
    }
    .my_statistic {
      display: flex;
      .my_follows,
      .my_followeds {
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
        &:hover span {
          color: #fff;
        }
      }
      .my_follows {
        border-right: 1px solid #24313d;
      }
    }
  }
}
</style>
