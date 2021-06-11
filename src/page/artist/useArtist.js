import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export default function() {
  const route = useRoute();

  const getArtistDetail = async id => {
    
  }

  onMounted(async () => {
    let id = route.query.id;
    await getArtistDetail(id);
  })

  // 路由参数中的id变化时，重新调用接口
  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    let fromId = from.query.id;
    if (toId !== fromId) {
      await getArtistDetail(toId);
    }
  })

  return {

  }
}