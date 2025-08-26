import './assets/main.css'
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import axios from 'axios'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(MotionPlugin)
app.use(router)
app.use(createVfm())
app.use(createPinia())

app.mount('#app')

axios.defaults.baseURL = "http://localhost:5000"
