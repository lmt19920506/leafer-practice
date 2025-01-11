import { createApp } from 'vue'
import './style.css'
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'
import { router } from './router/index'

const app  = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
createApp(App).use(router)
