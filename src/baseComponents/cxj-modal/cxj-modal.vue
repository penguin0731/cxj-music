<template>
  <teleport to="body">
    <transition name="modal_fade" type="animation" appear>
      <div v-show="visible" class="modal_wrap">
        <div class="modal_box">
          <div class="modal_content" :style="{width: `${width}px`}">
            <cxj-icon class="icon_close" @click="cancel($event)" />
            <div class="modal_header">
              <div class="modal_title">{{ title }}</div>
            </div>
            <div class="modal_body">
              <slot />
            </div>
            <div v-if="footer" class="modal_footer">
              <div class="modal_btns">
                <div class="modal_btn" @click="cancel($event)">取 消</div>
                <div class="modal_btn" @click="ok($event)">确 定</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import useModal from "./useModal";
import cxjIcon from "@/baseComponents/cxj-icon/cxj-icon.vue";
export default {
  components: { cxjIcon },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    footer: {
      type: Boolean,
      default: true
    }
  },
  emits: ['cancel', 'ok'],
  setup(props, context) {

    return {
      ...useModal(context),
    }
  }
}
</script>

<style lang="less">
.modal_wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.45);
  z-index: 1000;
}
.modal_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: var(--fontColor);
}
.modal_content {
  position: relative;
  background-color: rgba(0, 0, 0, .8);
  border-radius: 5px;
}
.modal_header {
  padding: 16px 24px;
  border-bottom: 1px solid hsla(0,0%,100%,.6);
  .modal_title {
    margin: 0;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
    color: #fff;
  }
}
.modal_body {
  padding: 24px;
}
.modal_footer {
  padding: 10px 16px;
  border-top: 1px solid hsla(0,0%,100%,.6);
}
.modal_btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .modal_btn {
    padding: 6px 16px;
    border-radius: 3px;
    border: 1px solid hsla(0,0%,100%,.6);
    font-size: 14px;
    cursor: pointer;
    &:not(:first-of-type) {
      margin-left: 10px;
    }
    &:hover {
      border: 1px solid #fff;
      color: #fff;
    }
  }
}
.icon_close {
  position: absolute;
  top: 16px;
  right: 24px;
  opacity: 0.8;
  width: 20px;
  height: 20px;
  background-position: -37px -197px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}

@keyframes modal-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes modal-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
.modal_fade-enter-active{
  animation: modal-fadein .3s;
  .modal_box {
    animation: modal-in .5s;
  }
}
</style>