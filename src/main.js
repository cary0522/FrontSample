import './assets/style/Style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

const vuetify = createVuetify({ components, directives })
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
