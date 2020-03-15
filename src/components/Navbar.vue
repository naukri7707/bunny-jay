<template>
  <b-navbar type="dark" variant="dark" sticky>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="nickname" v-if="isLogin" right>
        <b-dropdown-item to="/user/profile">個人資料</b-dropdown-item>
        <b-dropdown-item @click="logout()">登出</b-dropdown-item>
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
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(
        nickname => {
          this.toast(`再見，${nickname}`, {
            title: "登出成功",
            variant: "success"
          });
          this.$router.push("/login");
        },
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
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
