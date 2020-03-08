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
    appStyle() {
      return this.$store.state.app.style;
    }
  },
  created() {
    this.$store.dispatch("user/autoLogin");
    this.$router.push(this.$route.query.link);
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
