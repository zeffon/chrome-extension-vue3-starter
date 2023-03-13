import { createApp, h } from 'vue'

const App = {
  render() {
    return h('div', 'Hello Options')
  },
}

const app = createApp(App)
app.mount('#app-options')
