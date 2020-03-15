<template>
  <b-container>
    <h1>重設密碼</h1>
    <b-form @submit.prevent="submit()">
      <b-input-group class="mb-3" prepend="新的密碼">
        <b-form-input type="password" v-model="newPassword"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-3" prepend="確認密碼">
        <b-form-input type="password" v-model="comfirmPassword"></b-form-input>
      </b-input-group>
      <b-button class="float-right" type="submit" variant="success"
        >確認</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "resetPassword",
  data() {
    return {
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
      const data = {
        newPassword: this.newPassword,
        uid: this.$route.query.uid,
        vid: this.$route.query.vid
      };
      this.$store.dispatch("user/resetPassword", data).then(
        ({ data }) => {
          this.toast("為您導向登入頁面", {
            title: data,
            variant: "success"
          });
          this.$router.push("/login");
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
