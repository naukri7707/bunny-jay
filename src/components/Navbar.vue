<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="isLogin" right>
        <template v-slot:button-content>
          <em>{{ nickname }}</em>
        </template>
        <b-dropdown-item to="#">個人資料</b-dropdown-item>
        <b-dropdown-item to="#">登出</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else to="/login">登入</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLogin() {
      return this.$store.state.user.login;
    },
    nickname() {
      return this.$store.state.user.nickname;
    }
  }
};
</script>

<style></style>
