import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
// User
import User from "@/views/User/Index.vue";
import Profile from "@/views/User/Profile.vue";
import Setting from "@/views/User/Setting.vue";
// Product
import Product from "@/views/Product/Index.vue";
import Borrow from "@/views/Product/Borrow.vue";
import List from "@/views/Product/List.vue";
import NotFound from "@/views/404.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  // Product
  {
    path: "/product/:product",
    component: Product,
    children: [
      { path: "borrow", component: Borrow },
      { path: "list", component: List }
    ]
  },
  // User
  { path: "/user/login", component: Login },
  {
    path: "/user",
    component: User,
    children: [
      { path: "profile", component: Profile },
      { path: "setting", component: Setting }
    ]
  },
  // 404 NotFound
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
