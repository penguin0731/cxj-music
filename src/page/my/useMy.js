import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';

export default function() {
  const route = useRoute();
  let userInfo = ref({});

  const getUserDetail = () => {
    let id = route.query.id;
    if(!id) return;
    api.user.getDetail(id).then(res => {
      userInfo.value = res.profile;
      console.log(userInfo.value)
    })
  }

  onMounted(() => {
    getUserDetail();
  })

  return {
    userInfo,
  }
}