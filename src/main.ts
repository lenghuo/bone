import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers'
import { setupNaive } from '@/plugins'

const app = createApp(App)
setupNaive(app)
app.use(router)
app.mount('#app')
