// vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap-vue
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import PortalVue from "portal-vue";

// vue-axios
import axios from "axios";
import vueAxios from "vue-axios";

// 載入自訂義的全域 javascript
import "./assets/js";

// 載入全域 mixin
import toast from "./assets/js/mixin/toast";

Vue.use(BootstrapVue);
Vue.use(PortalVue);
Vue.use(BootstrapVueIcons); // 分開載入否則會出問題
Vue.use(vueAxios, axios);

Vue.config.productionTip = false;

Vue.mixin(Object.assign(toast));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
