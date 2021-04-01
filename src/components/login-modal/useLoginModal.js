import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from 'vuex';
import api from "@/api";
import { setUid } from "@/utils/storage";

export default function(loginVisibleRef, { emit }) {
  const store = useStore();
  let timer, toastTimer;
  let loginVisible = computed(() => loginVisibleRef.value);
  let isQRCodeLogin = ref(true);
  let qrImg = ref('');
  let Uid = ref('');
  let isScan = ref(false); // 是否已扫码
  let isQRCodeInvalid = ref(false); // 二维码是否已过期
  let toastRef = ref(null);

  // 关闭登录modal
  const close = e => {
    Uid.value = '';
    emit('close', e)
  }

  // 切换二维码登录
  const toQRCode = () => {
    isQRCodeLogin.value = true;
    qrcodeLogin();
  }

  // 创建二维码
  const createQRCode = async () => {
    const res = await api.login.getQRKey();
    const key = res.data.unikey;
    const res2 = await api.login.qrCreate(key);
    qrImg.value = res2.data.qrimg;
    isQRCodeInvalid.value = false;
    return key
  }

  // 扫描二维码登录
  const qrcodeLogin = async () => {
    const key = await createQRCode();
    timer = setInterval(async () => {
      const statusRes = await api.login.qrCheck(key);
      switch(statusRes.code) {
        case 800:
          // 二维码过期
          isQRCodeInvalid.value = true;
          console.log('二维码已过期,请重新获取')
          clearInterval(timer)
          break;
        case 801:
          // 待扫码
          isScan.value = false;
          break;
        case 802:
          // 待确认
          isScan.value = true;
          break;
        case 803:
          // 授权登录成功,这一步会返回cookie
          clearInterval(timer)
          console.log('授权登录成功')
          getLoginStatus();
          break;
        default:
          break;
      }
    }, 500)
  }

  // 获取登录状态
  const getLoginStatus = async () => {
    const res = await api.login.getStatus();
    store.commit('setUid', setUid(res.data.profile.userId));
    close();
  }

  // 切换Uid登录
  const toUidLogin = () => {
    isQRCodeLogin.value = false;
    clearInterval(timer);
  }

  const UidLogin = () => {
    if(!Uid.value) {
      toastRef.value.show('Uid不能为空');
      return;
    }
    api.user.getPlayList(Uid.value).then(({ playlist }) => {
      if(playlist.length == 0 || !playlist[0].creator) {
        toastRef.value.show(`Uid为${Uid.value}的用户不存在`);
        return;
      }
      store.commit('setUid', setUid(Uid.value));
      close();
    })
  }

  onMounted(() => {
    qrcodeLogin();
  });

  onUnmounted(() => {
    clearInterval(timer);
  })
  
  return {
    loginVisible,
    isQRCodeLogin,
    qrImg,
    Uid,
    isScan,
    isQRCodeInvalid,
    toastRef,
    close,
    toQRCode,
    qrcodeLogin,
    toUidLogin,
    UidLogin,
  }
}