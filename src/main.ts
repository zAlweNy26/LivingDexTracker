import { createApp, markRaw } from 'vue'
import type { Raw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import type { Router } from 'vue-router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@assets/base.css'

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Raw<Router>
    }
}

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ],
})

app.use(router)
app.use(pinia)

app.mount('#app')
