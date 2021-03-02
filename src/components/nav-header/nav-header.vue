<template>
  <div class="header">
      <div class="header-box">
        <div class="logo-header">cxj-music在线音乐播放器</div>
        <div class="nav-header">
          <ul>
            <li 
              v-for="(item, index) in navList" 
              :key="index" 
              :class="{'actived': curNav == index}"
              @click="onClickNav(item.url, index)"
            >{{ item.label }}</li>
          </ul>
        </div>
        <div class="search-header">
          <div class="search-box">
            <input type="text" placeholder="音乐/歌手/专辑/用户">
            <button class="search">
              <i class="sprite icon_search"></i>
            </button>
          </div>
        </div>
        <div class="user-header"></div>
      </div>
  </div>
</template>

<script>
import useNavHeader from './composition/useNavHeader';
export default {
  setup() {
    

    return {
      ...useNavHeader(),
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  box-sizing: border-box;
  background: var(--themeColor2);

  .header-box {
    width: 1300px;
    margin: 0 auto;
    display: flex;

    .logo-header {
      font-size: 1.4rem;
      font-weight: bold;
      margin-right: 25px;
      color: #fff;
    }

    .nav-header > ul {
      display: flex;
      padding: 0;
      margin: 0;
      font-size: 18px;

      li {
        position: relative;
        list-style: none;
        padding: 0 20px;
        cursor: pointer;
        color: hsla(0,0%,100%,.6);
      }
      li.actived, li:hover {
        color: #fff;
      }
      li::after {
        content: '';
        position: absolute;
        top: -1px;
        left: 100%;
        width: 0;
        height: 100%;
        border-bottom: 2px solid #fff;
        transition: 0.2s all linear;
      }
      li:hover::after {
        left: 0;
        width: 100%;
        transition-delay: 0.1s;
      }
      li:hover ~ li::after {
        left: 0;
      }
    }

    .search-header {
      display: flex;
      align-items: center;

      .search-box {
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
    }
  }
}
</style>