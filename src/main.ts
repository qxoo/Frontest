import './assets/app.scss'

import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persistedState)
app.use(pinia)

app.mount('#app')
