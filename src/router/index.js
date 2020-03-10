import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import User from "@/views/User/Index.vue";
import Profile from "@/views/User/Profile.vue";
import Setting from "@/views/User/Setting.vue";
import Product from "@/views/Product.vue";
import Borrow from "@/views/Borrow.vue";
import NotFound from "@/views/404.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  { path: "/user/login", component: Login },
  {
    path: "/user",
    component: User,
    children: [
      { path: "profile", component: Profile },
      { path: "setting", component: Setting }
    ]
  },
  { path: "/user/:tab", component: User },
  { path: "/product/:product", component: Product },
  { path: "/borrow", component: Borrow },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
