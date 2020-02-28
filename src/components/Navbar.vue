<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/login">登入</b-nav-item>
      <b-nav-item-dropdown right>
        <template v-slot:button-content>
          <em>User</em>
        </template>
        <b-dropdown-item to="#">個人資料</b-dropdown-item>
        <b-dropdown-item to="#">登出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style></style>
