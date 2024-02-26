import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { firebaseApp } from '@/firebaseConfig'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

const pinia = createPinia()


app.directive('click-outside', {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event:Event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }

})


pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
