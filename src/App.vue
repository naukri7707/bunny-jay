<template>
  <div id="app" :style="appStyle">
    <Sidebar />
    <main id="main" :class="{ 'sidebar-hidden': $store.state.sidebar.hidden }">
      <Navbar />
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    selection() {
      return this.$store.state.product.selection;
    },
    appStyle() {
      return {
        backgroundImage: `url(${this.selection.background})`
      };
    }
  },
  created() {
    this.$store.dispatch("autologin");
    this.$router.push(this.$route.query.link);
    // TODO 判斷 session 是否存在 (已登入)
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  font-family: "BunnyJay";
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: #f5f5f5;
  background-attachment: fixed;

  #main {
    margin-left: $sidebar-width;
    transition: $sidebar-transition;

    &.sidebar-hidden {
      margin-left: 0;
    }
  }
}
</style>
