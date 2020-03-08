import Vue from "vue";
import Vuex from "vuex";
// modules
import app from "./app.js";
import sidebar from "./sidebar.js";
import user from "./user.js";
import product from "./product.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { app, sidebar, user, product }
});
