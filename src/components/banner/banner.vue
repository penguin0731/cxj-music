<template>
  <div
    class="banner-wrap"
    :style="{
      backgroundImage: bannerList[curIndex]
        ? `url(${bannerList[curIndex].imageUrl}?imageView&blur=40x20)`
        : '',
      backgroundSize: '6000px',
      backgroundPosition: 'center center',
    }"
    @click="click"
  >
    <div class="banner-box">
      <transition-group name="fade">
        <a
          class="active"
          href=""
          v-for="(banner, index) in bannerList"
          :key="index"
          v-show="index == curIndex"
        >
          <img :src="banner.imageUrl" />
        </a>
      </transition-group>
    </div>
    <div class="left_arrow" @click="prevClick">
      <svg t="1615125734270" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1414" width="48" height="48"><path d="M347.528 503.774l390.261-390.26c11.277-11.277 11.312-29.69-0.023-41.025-11.312-11.312-29.703-11.345-41.024-0.024L286.21 482.996c-11.277 11.277-11.312 29.69 0.023 41.025a29.204 29.204 0 0 0 3.76 3.175l395.025 423.612c10.92 11.71 29.3 12.319 41 1.408 11.724-10.933 12.332-29.336 1.456-40.999L347.528 503.774z" p-id="1415" fill="#ffffff"></path></svg>
    </div>
    <div class="right_arrow" @click="nextClick">
      <svg t="1615125641180" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1125" width="48" height="48"><path d="M712.534 504.215L324.38 116.059c-11.216-11.215-11.25-29.53 0.023-40.803 11.252-11.251 29.542-11.285 40.804-0.024L773.52 483.548c11.216 11.215 11.25 29.53-0.023 40.803a28.99 28.99 0 0 1-3.74 3.158L376.864 948.836c-10.861 11.647-29.143 12.252-40.78 1.401-11.66-10.874-12.264-29.178-1.448-40.778l377.898-405.244z" p-id="1126" fill="#ffffff"></path></svg>
    </div>
    <ul class="dot">
      <li 
        v-for="(banner, index) in bannerList"
        :key="index"
        :class="{active: index == curIndex}"
        @click="goTo(index)"
      >
        <i></i>
      </li>
    </ul>
  </div>
</template>

<script>
import useBanner from "./composition/useBanner";

export default {
  setup(props) {
    return {
      ...useBanner(props),
    };
  },
};
</script>

<style lang="less" scoped>
.banner-wrap {
  position: relative;
  overflow: hidden;
  .banner-box {
    position: relative;
    width: 980px;
    height: 363px;
    margin: 0 auto;
    .active {
      position: absolute;
      img {
        width: 980px;
      }
    }
  }
  .left_arrow, .right_arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 79px;
    height: 108px;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .left_arrow {
    left: -79px;
    opacity: 0;
    transition: all .4s ease-out;
  }
  .right_arrow {
    right: -79px;
    opacity: 0;
    transition: all .4s ease-out;
  }
  &:hover .left_arrow {
    left: 0;
    opacity: 1;
    transition: all .4s ease-in;
  }
  &:hover .right_arrow {
    right: 0;
    opacity: 1;
    transition: all .4s ease-in;
  }
  ul.dot {
    width: 200px;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    li {
      cursor: pointer;
      i {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .6);
      }
      &.active i, &:hover i {
        background-color: var(--themeColor);
      }
    }
  }
}

.fade-enter-active {
  transition: opacity 1.2s ease-in;
}
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0.2;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>