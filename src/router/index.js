import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Index from "@/views/Index.vue";
import Borrow from "@/views/Borrow.vue";
import NotFound from "@/views/404.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  { path: "/borrow/:product", component: Borrow },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
