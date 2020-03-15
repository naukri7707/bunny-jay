<template>
  <b-tabs
    id="setting"
    nav-wrapper-class="nav-wrapper"
    content-class="content"
    @activate-tab="onActivateTab"
    pills
    fill
  >
    <b-tab title="修改密碼" active>
      <ChangePassword />
    </b-tab>
    <b-tab title="帳號安全" lazy>
      <LoginDevice />
    </b-tab>
    <b-tab title="泡咖啡" lazy></b-tab>
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
  },
  methods: {
    onActivateTab(newTabIndex, prevTabIndex, bvEvt) {
      if (newTabIndex === 2) {
        bvEvt.preventDefault();
        this.axios
          .post("/user/coffee")
          .then(() => {})
          .catch(({ response }) => {
            const { status, statusText, data } = response;
            this.toast(data, {
              title: `Error ${status} : ${statusText}`,
              variant: "danger"
            });
          });
      }
    }
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
