import { createApp, h } from 'vue'

const App = {
  render() {
    return h('div', 'Hello Popup')
  },
}

const app = createApp(App)
app.mount('#app-popup')
