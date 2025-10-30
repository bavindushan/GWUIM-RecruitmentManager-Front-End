import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import { validateStoredToken } from './utils/authHelper'


const app = createApp(App)
app.use(createPinia())

const isValid = validateStoredToken()

if (!isValid) {
  // Redirect only if already on a protected page
  if (['/dashboard', '/applications', '/admin/dashboard', '/superadmin/dashboard'].includes(window.location.pathname)) {
    if (window.location.pathname.startsWith('/admin')) {
      window.location.replace('/admin/login')
    } else if (window.location.pathname.startsWith('/superadmin')) {
      window.location.replace('/superadmin/login')
    } else {
      window.location.replace('/login')
    }
  } else {
    // just mount if already on login page
    app.use(router)
    app.mount('#app')
  }
} else {
  app.use(router)
  app.mount('#app')
}
