import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({components,directives})
app.use(vuetify)

import '@mdi/font/css/materialdesignicons.css' 
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'mdi', 
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
