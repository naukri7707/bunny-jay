// vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap
import bootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

// axios
import axios from "axios";
import vueAxios from "vue-axios";

// 載入自訂義的全域 javascript
import "./assets/js";

Vue.use(bootstrapVue, vueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
