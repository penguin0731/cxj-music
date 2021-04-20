import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/common.css'

const app = createApp(App);
app.use(router)
.use(store)
.mount('#app')
