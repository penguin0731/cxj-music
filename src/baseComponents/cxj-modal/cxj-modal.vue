<template>
  <teleport to="body">
    <transition name="cxjModal_fade" type="animation" appear>
      <div v-show="visible" class="modal_wrap">
        <div class="cxjModal_box">
          <div class="cxjModal_content" :style="{ width: `${width}px` }">
            <cxj-icon class="icon_close close" @click="cancel($event)" />
            <div class="cxjModal_header">
              <div class="cxjModal_title">{{ title }}</div>
            </div>
            <div class="cxjModal_body">
              <slot></slot>
            </div>
            <div v-if="footer" class="cxjModal_footer">
              <div class="cxjModal_btns">
                <div class="cxjModal_btn" @click="cancel($event)">
                  {{ cancelText }}
                </div>
                <div class="cxjModal_btn" @click="ok($event)">
                  {{ comfirmText }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import useModal from './useModal';
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
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
    },
    comfirmText: {
      type: String,
      default: '确 定'
    },
    cancelText: {
      type: String,
      default: '取 消'
    }
  },
  emits: ['cancel', 'ok'],
  setup(props, context) {
    return {
      ...useModal(context)
    };
  }
};
</script>

<style lang="scss">
.modal_wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}
.cxjModal_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: var(--fontColor);
}
.cxjModal_content {
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}
.cxjModal_header {
  padding: 16px 24px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.6);
  .cxjModal_title {
    margin: 0;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
    color: #fff;
  }
}
.cxjModal_body {
  padding: 24px;
}
.cxjModal_footer {
  padding: 10px 16px;
  border-top: 1px solid hsla(0, 0%, 100%, 0.6);
}
.cxjModal_btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .cxjModal_btn {
    padding: 6px 16px;
    border-radius: 3px;
    border: 1px solid hsla(0, 0%, 100%, 0.6);
    font-size: 14px;
    user-select: none;
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
.icon_close.close {
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
.cxjModal_fade-enter-active {
  animation: modal-fadein 0.3s;
  .cxjModal_box {
    animation: modal-in 0.5s;
  }
}
</style>
