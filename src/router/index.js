import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Borrow from "@/views/Borrow.vue";
import NotFound from "@/views/404.vue";
Vue.use(VueRouter);

// TODO user to modules & path => /user/login
const routes = [
  { path: "/", component: Index },
  { path: "/login", component: Login },
  { path: "/borrow/:product", component: Borrow },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
