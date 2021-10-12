import { ref, toRefs, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import api from '@/api';
import { setUid } from '@/utils/storage';

export default function (loginVisibleRef, { emit }) {
  const store = useStore();
  let timer = null;
  let data = reactive({
    isQRCodeLogin: true, // 是否二维码登录
    qrImg: '', // 二维码
    Uid: '',
    isScan: false, // 是否已扫码
    isQRCodeInvalid: false, // 二维码是否已过期
    isAuthorize: false // 是否授权成功
  });
  let loginVisible = computed(() => loginVisibleRef.value);
  let toastRef = ref(null);

  // 关闭登录modal
  const close = e => {
    data.Uid = '';
    emit('close', e);
  };

  // 切换二维码登录
  const toQRCode = () => {
    data.isQRCodeLogin = true;
    qrcodeLogin();
  };

  // 创建二维码
  const createQRCode = async () => {
    const res = await api.login.getQRKey();
    const key = res.data.unikey;
    const res2 = await api.login.qrCreate(key);
    data.qrImg = res2.data.qrimg;
    data.isQRCodeInvalid = false;
    return key;
  };

  // 扫描二维码登录
  const qrcodeLogin = async () => {
    const key = await createQRCode();
    timer = setInterval(async () => {
      if (data.isAuthorize) return;
      const statusRes = await api.login.qrCheck(key);
      switch (statusRes.code) {
        case 800:
          // 二维码过期
          clearInterval(timer);
          console.log('二维码已过期,请重新获取');
          data.isQRCodeInvalid = true;
          break;
        case 801:
          // 待扫码
          data.isScan = false;
          break;
        case 802:
          // 待确认
          data.isScan = true;
          break;
        case 803:
          // 授权登录成功,这一步会返回cookie
          clearInterval(timer);
          console.log('授权登录成功');
          data.isAuthorize = true;
          localStorage.setItem('cxjMusic_cookie', statusRes.cookie);
          getLoginStatus();
          break;
        default:
          break;
      }
    }, 2000);
  };

  // 获取登录状态
  const getLoginStatus = async () => {
    const res = await api.login.getStatus();
    console.log('获取登录状态', res);
    store.commit('setUid', setUid(res.data.profile.userId));
    close();
  };

  // 切换Uid登录
  const toUidLogin = () => {
    data.isQRCodeLogin = false;
    clearInterval(timer);
  };

  const UidLogin = () => {
    if (!data.Uid) {
      toastRef.value.show('Uid不能为空');
      return;
    }
    api.user.getPlayList(data.Uid).then(({ playlist }) => {
      if (playlist.length == 0 || !playlist[0].creator) {
        toastRef.value.show(`Uid为${data.Uid}的用户不存在`);
        return;
      }
      store.commit('setUid', setUid(data.Uid));
      close();
    });
  };

  onMounted(() => {
    qrcodeLogin();
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return {
    ...toRefs(data),
    loginVisible,
    toastRef,
    close,
    toQRCode,
    qrcodeLogin,
    toUidLogin,
    UidLogin
  };
}
