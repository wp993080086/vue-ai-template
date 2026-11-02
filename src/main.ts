import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { injectRouter } from './apis/request'
import './styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
/** 注入路由实例，供请求层处理 401 跳转 */
injectRouter(router)
app.mount('#app')
