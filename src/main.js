import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import components from './components'
import common from './common'
import filters from './filters'

Vue.config.productionTip = false
// eslint-disable-next-line
Vue.prototype.$axios = axios

// 注册common组件
Object.keys(components).forEach(componentName => {
  // eslint-disable-next-line
  Vue.component(componentName, components[componentName])
})

// 注册common方法
Object.keys(common).forEach(funcName => {
  // eslint-disable-next-line
  Vue.prototype[funcName] = common[funcName]
})

Object.keys(filters).forEach(key => {
  // eslint-disable-next-line
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
