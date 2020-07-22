import Vue from 'vue'
import App from './App.vue'

import './style.less'

Vue.config.productionTip = false
console.log(123)
new Vue({
  render: h => h(App),
}).$mount('#app')
