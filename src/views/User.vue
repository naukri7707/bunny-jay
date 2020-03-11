<template>
  <div>
    <b-nav tabs class="router-tab">
      <b-nav-item
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        :active="tab.path === $route.path"
      >
        {{ tab.title }}
      </b-nav-item>
    </b-nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      tabs: [
        { path: "/user/profile", title: "個人資料" },
        { path: "/user/setting", title: "設定" }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 檢查登入狀態，若未登入導向至登入頁面
      vm.$store.dispatch("user/checkLogin").then(
        () => {
          next();
        },
        ({ status, data }) => {
          if (status === 401) {
            next("/user/login");
          } else {
            this.toast(data, {
              title: `Error ${status}`,
              variant: "danger"
            });
            next();
          }
        }
      );
    });
  }
};
</script>

<style scope lang="scss">
.router-tab {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 0;

  .active {
    background: linear-gradient(180deg, #ffffff 50%, #f5f5f5 100%);
    border-color: #dee2e6 #dee2e6 #f5f5f5 !important;
  }
}
</style>
