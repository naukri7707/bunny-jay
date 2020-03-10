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
    <b-tab title="登入裝置" lazy></b-tab>
    <b-tab title="泡咖啡" lazy>
      <b-button @click="test()">TEST</b-button>
    </b-tab>
  </b-tabs>
</template>

<script>
import ChangePassword from "@/components/ChangePassword.vue";

export default {
  name: "setting",
  components: {
    ChangePassword
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
