<template>
  <b-navbar type="dark" variant="dark" sticky>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="isLogin" right>
        <template v-slot:button-content>
          <em>{{ nickname }}</em>
        </template>
        <b-dropdown-item to="#">個人資料</b-dropdown-item>
        <b-dropdown-item @click="logout()">登出</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else to="/user/login">登入</b-nav-item>
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
  },
  methods: {
    logout() {
      // TODO toast message
      this.$store.dispatch("logout").then(
        ({ data }) => {
          alert(data);
          this.$router.push("/user/login");
        },
        ({ status, data }) => {
          alert(`Error ${status}\n\n ${data}`);
          this.$router.go(0);
        }
      );
    }
  }
};
</script>

<style></style>
