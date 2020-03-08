import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Product from "@/views/Product.vue";
import NotFound from "@/views/404.vue";
Vue.use(VueRouter);

// TODO user to modules & path => /user/login
const routes = [
  { path: "/", component: Index },
  { path: "/user/login", component: Login },
  { path: "/product/:product", component: Product },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
