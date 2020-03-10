<template>
  <b-tabs
    id="setting"
    nav-wrapper-class="nav-wrapper"
    content-class="content"
    pills
    fill
  >
    <b-tab title="修改密碼" active>
      <ChangePassword />
    </b-tab>
    <b-tab title="已登入裝置" lazy>
      <LoginDevice />
    </b-tab>
    <b-tab title="泡咖啡" lazy>
      <b-button @click="test()">TEST</b-button>
    </b-tab>
  </b-tabs>
</template>

<script>
import ChangePassword from "@/components/ChangePassword.vue";
import LoginDevice from "@/components/LoginDevice.vue";
export default {
  name: "setting",
  components: {
    ChangePassword,
    LoginDevice
  }
};
</script>

<style lang="scss">
// 要影響外部元素，不可為 scoped
#setting {
  .nav-wrapper {
    padding: 0 0.5rem 1rem;
  }

  .content {
    padding: 0 0.5rem 1rem;
  }
}
</style>
