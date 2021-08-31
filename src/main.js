import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import vuex from 'vuex'

const app =createApp(App);
axios.defaults.baseURL='https://autumnfish.cn'
//app.config.globalProperties.$axios = axios
createApp(App).use(store).use(router).use(vuex).use(ElementPlus).mount('#app')