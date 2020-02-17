<template>
  <div id="app">
    <Sidebar />
    <main id="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  created() {
    this.$router.push(this.$route.query.link);
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  font-family: "BunnyJay";
  #main {
    min-height: inherit;
  }
}
</style>
