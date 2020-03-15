<template>
  <b-container>
    <h1>忘記密碼</h1>
    <b-form @submit.prevent="submit()">
      <b-input-group class="mb-3" prepend="電子郵箱">
        <b-form-input
          type="text"
          v-model="email"
          placeholder="綁定的電子郵箱"
        ></b-form-input>
      </b-input-group>
      <b-button class="float-right" type="submit" variant="success"
        >確認</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "forgotPassword",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("user/forgotPassword", this.email).then(
        ({ data }) => {
          this.toast("請於15分鐘內完成密碼重置", {
            title: data,
            variant: "success"
          });
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
