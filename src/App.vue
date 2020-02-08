<template>
  <div id="app">
    <Sidebar />
    <main id="main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar
  }
};
</script>

<style lang="scss"></style>
