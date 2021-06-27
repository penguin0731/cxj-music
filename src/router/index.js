import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/music'
    },
    {
      path: '/my',
      component: () => import('@/page/my/my.vue')
    },
    {
      path: '/music',
      component: () => import('@/page/music.vue'),
      redirect: '/music/recommend',
      children: [
        {
          path: 'recommend',
          component: () => import('@/page/recommend/recommend.vue')
        },
        {
          path: 'toplist',
          component: () => import('@/page/toplist/toplist.vue')
        },
        {
          path: 'songlist',
          component: () => import('@/page/songlist/songlist.vue')
        },
        {
          path: 'djRadio',
          component: () => import('@/page/djRadio/djRadio.vue')
        },
        {
          path: 'artistlist',
          component: () => import('@/page/artistlist/artistlist.vue')
        },
        {
          path: 'album',
          component: () => import('@/page/album/album.vue')
        }
      ]
    },
    {
      path: '/song',
      component: () => import('@/page/song/song.vue')
    },
    {
      path: '/artist',
      component: () => import('@/page/artist/artist.vue')
    },
    {
      path: '/mv',
      component: () => import('@/page/mv/mv.vue')
    }
  ]
});
