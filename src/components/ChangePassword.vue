<template>
  <b-form @submit.prevent="submit()">
    <b-input-group class="mb-3" prepend="舊的密碼">
      <b-form-input v-model="oldPassword"></b-form-input>
    </b-input-group>
    <b-input-group class="mb-3" prepend="新的密碼">
      <b-form-input v-model="newPassword"></b-form-input>
    </b-input-group>
    <b-input-group class="mb-3" prepend="確認密碼">
      <b-form-input v-model="comfirmPassword"></b-form-input>
    </b-input-group>
    <b-button class="float-right" type="submit" variant="success"
      >確認</b-button
    >
  </b-form>
</template>

<script>
export default {
  name: "changePassword",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      comfirmPassword: ""
    };
  },
  methods: {
    submit() {
      if (this.newPassword !== this.comfirmPassword) {
        this.toast("確認密碼與新的密碼不符", {
          title: "警告",
          variant: "warning"
        });
        return;
      }
      const { oldPassword, newPassword } = this.$data;
      this.$store
        .dispatch("user/changePassword", { oldPassword, newPassword })
        .then(
          () => {
            this.toast("系統將登出所有您曾經登入的設備", {
              title: "更新完成",
              variant: "success"
            });
            this.oldPassword = "";
            this.newPassword = "";
            this.comfirmPassword = "";
          },
          ({ status, data }) => {
            this.toast(data, {
              title: `Error ${status}`,
              variant: "danger"
            });
          }
        );
    }
  }
};
</script>

<style lang="scss" scoped></style>
