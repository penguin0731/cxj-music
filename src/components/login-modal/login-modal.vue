<template>
  <cxj-modal title="登录" :visible="loginVisible" :footer="false" @cancel="close">
    <!-- qrcode -->
    <div v-show="qrcodeLogin" class="qrcode_body">
      <div class="qrcode_main">
        <div v-if="!true" class="phone"></div>
        <div class="qrcode_main_right">
          <div v-if="!true" class="waitScan">
            <div class="title">扫码登录</div>
            <div class="qr">
              <img class="qrImg" :src="qrSrc">
            </div>
            <p class="txt">使用 网易云音乐APP 扫码登录</p>
          </div>
          <div v-if="!false" class="scanSuc">
            <div class="suc"></div>
            <p>扫描成功</p>
          </div>
          <p v-if="!false" class="confirm mt10">请在手机上确认登录</p>
        </div>
      </div>
      <div class="otherbtn mt20" @click="toUidLogin">选择其他登录方式</div>
    </div>
    <!-- uidLogin -->
    <div v-show="!qrcodeLogin" class="uidLogin_body">
      <div class="toqrcode" title="扫描二维码登录" @click="toQRCode">
        <svg t="1616909170380"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33162" width="32" height="32"><path d="M128 896h256V640l76.8-76.8v409.6H51.2l76.8-76.8z m512-332.8v179.2h76.8v76.8h-76.8v76.8h76.8v76.8h-153.6V563.2h76.8z m256 256v76.8h76.8v76.8h-153.6v-153.6h76.8z m-563.2-128v153.6H179.2l153.6-153.6z m640-128v204.8h-76.8v-51.2h-76.8v102.4h-76.8v-102.4h76.8v-76.8h76.8v-76.8h76.8z m-153.6 0v76.8h-102.4v-76.8h102.4z m153.6-512v409.6H563.2l76.8-76.8h256V128l76.8-76.8z m-128 128v153.6h-153.6l153.6-153.6z" fill="#bdbdbe" p-id="33163"></path></svg>
      </div>
      
      <div class="uidLogin_row">
        <input class="uidLogin_input" type="text" placeholder="请输入您的网易云UID">
        <div class="uidLogin_btn ml20" @click="UidLogin">登录</div>
      </div>
      <div class="uidLogin_text mt20">
        <h4>提示：</h4>
        <p> 1、
          <a target="_blank" href="https://music.163.com"> 点我（https://music.163.com）</a>打开网易云音乐官网
        </p>
        <p>2、点击页面右上角的“登录”</p>
        <p>3、点击您的头像，进入我的主页</p>
        <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
      </div>
    </div>
  </cxj-modal>
</template>

<script>
import { computed } from 'vue'
import useLoginModal from './useLoginModal'
import cxjModal from '@/baseComponents/cxj-modal/cxj-modal.vue'

export default {
  components: { cxjModal },
  props: {
    loginVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, context) {
    let loginVisibleRef = computed(() => props.loginVisible)
    return {
      ...useLoginModal(loginVisibleRef, context),
    }
  }
}
</script>

<style lang="less" scoped>
// qrcode
.qrcode_main {
  display: flex;
  justify-content: space-around;
  .phone {
    width: 142px;
    height: 250px;
    background-image: url('@/assets/img/qr_guide.png');
    background-size: cover;
  }
  .qrcode_main_right {
    .waitScan {
      .title {
        text-align: center;
        font-size: 18px;
      }
      .qr {
        margin: 13px auto;
      }
    }
    .scanSuc {
      text-align: center;
      .suc {
        width: 140px;
        height: 140px;
        margin: 10px;
        background-image: url('@/assets/img/scan_success.png');
        background-size: cover;
      }
      p {
        font-size: 18px;
      }
    }
    .confirm {
      text-align: center;
      font-size: 14px;
    }
  }
}
.otherbtn {
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
}

// uidlogin
.uidLogin_row {
  display: flex;
  .uidLogin_input {
    flex: 1;
    width: 100%;
    height: 40px;
    color: #fff;
    padding: 0 15px;
    outline: none;
    background-color: transparent;
    border: 1px solid hsla(0, 0%, 100%, 0.6);
    box-sizing: border-box;
  }
  .uidLogin_btn {
    padding: 9px 25px;
    border-radius: 3px;
    border: 1px solid hsla(0,0%,100%,.6);
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    &:hover {
      border: 1px solid #fff;
      color: #fff;
    }
  }
}
.uidLogin_text {
  a:hover {
    color: #fff;
  }
}
.toqrcode {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: .8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
</style>