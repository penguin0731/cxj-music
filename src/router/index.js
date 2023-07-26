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
          component: () => import('@/page/recommend/recommend.vue'),
          meta: {
            name: '推荐'
          }
        },
        // {
        //   path: 'toplist',
        //   component: () => import('@/page/toplist/toplist.vue'),
        //   meta: {
        //     name: '排行榜'
        //   }
        // },
        // {
        //   path: 'songlist',
        //   component: () => import('@/page/songlist/songlist.vue'),
        //   meta: {
        //     name: '歌单'
        //   }
        // },
        // {
        //   path: 'djRadio',
        //   component: () => import('@/page/djRadio/djRadio.vue'),
        //   meta: {
        //     name: '主播电台'
        //   }
        // },
        // {
        //   path: 'artistlist',
        //   component: () => import('@/page/artistlist/artistlist.vue'),
        //   meta: {
        //     name: '歌手'
        //   }
        // },
        // {
        //   path: 'album',
        //   component: () => import('@/page/album/album.vue'),
        //   meta: {
        //     name: '新碟上架'
        //   }
        // }
      ]
    },
    // {
    //   path: '/song',
    //   component: () => import('@/page/song/song.vue')
    // },
    // {
    //   path: '/artist',
    //   component: () => import('@/page/artist/artist.vue')
    // },
    // {
    //   path: '/mv',
    //   component: () => import('@/page/mv/mv.vue')
    // },
    // {
    //   path: '/songlist',
    //   component: () => import('@/page/songlist/songlistDetail.vue')
    // }
  ]
});
