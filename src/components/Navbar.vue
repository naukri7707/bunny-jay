<template>
  <b-navbar type="dark" variant="dark" sticky>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="nickname" v-if="isLogin" right>
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
      this.$store.dispatch("logout").then(
        nickname => {
          this.toast("登出成功", `再見，${nickname}`, {
            toaster: "TC",
            variant: "success"
          });
          this.$router.push("/user/login");
        },
        ({ status, data }) => {
          this.toast(`Error ${status}`, data, {
            toaster: "TC",
            variant: "danger"
          });
          this.$router.go(0);
        }
      );
    }
  }
};
</script>

<style scope lang="scss"></style>
