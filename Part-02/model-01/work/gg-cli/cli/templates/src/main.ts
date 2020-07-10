import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./element-ui.config";

Vue.config.productionTip = false;
Vue.directive("title", {
  inserted: (el: any) => {
    document.title = el.dataset.title;
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
