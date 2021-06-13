import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/assets/style/myProgress.css';
import '@/assets/style/common.css';

NProgress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

const app = createApp(App);
app.use(router).use(store).mount('#app');
