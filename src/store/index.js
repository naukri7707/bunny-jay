import Vue from "vue";
import Vuex from "vuex";
// modules
import sidebar from "./sidebar.js";
import user from "./user.js";
import product from "./product.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hidden: false
  },
  mutations: {},
  actions: {},
  modules: { sidebar, user, product }
});
