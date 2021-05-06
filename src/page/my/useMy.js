import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';

export default function() {
  const route = useRoute();
  let Uid = ref('');
  let userInfo = ref({});

  const getUserDetail = (id) => {
    if(!id) return;
    api.user.getDetail(id).then(res => {
      userInfo.value = res.profile;
      console.log(userInfo.value)
    })
  }

  onMounted(() => {
    Uid.value = route.query.id
    getUserDetail(Uid.value);
  })

  return {
    Uid,
    userInfo,
  }
}