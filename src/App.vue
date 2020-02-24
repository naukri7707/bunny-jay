<template>
  <div id="app" :style="appStyle">
    <Sidebar />
    <main id="main" :class="{ 'sidebar-hidden': $store.state.sidebar.hidden }">
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
    this.$router.push(this.$route.query.link);
  }
};
</script>

<style lang="scss">
:root {
  --app-height: 100%;
}

html,
body {
  padding: 0;
  margin: 0;
  overflow: scroll;
  width: 100vw;
  height: 100vh;

  @media not all and (hover: hover) {
    height: var(--app-height);
  }
}

#app {
  height: 100vh;
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
