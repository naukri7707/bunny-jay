<template>
  <div>
    <b-nav tabs class="router-tab">
      <b-nav-item
        v-for="tab in tabs"
        :key="tab.name"
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
  }
  // emit change tab
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
