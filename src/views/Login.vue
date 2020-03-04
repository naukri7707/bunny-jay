<template>
  <b-container id="login">
    <h1>LOGIN {{ username }}</h1>
    <b-row>
      <b-form @submit.prevent="onSubmit" @cancel="onCancel">
        <b-input-group class="mb-3">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="text"
            v-model="form.username"
            required
            placeholder="帳號"
          ></b-form-input>
        </b-input-group>
        <b-input-group class="mb-3">
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="password"
            v-model="form.password"
            required
            placeholder="密碼"
          ></b-form-input>
        </b-input-group>
        <b-form-group>
          <b-form-checkbox-group v-model="form.option">
            <b-form-checkbox value="keep-login">
              保持登入狀態
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">登入</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        option: []
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("user/login", this.form).then(
        ({ data }) => {
          this.toast(`歡迎回來，${data.nickname}`, {
            title: "登入成功",
            toaster: "TC",
            variant: "success"
          });
          this.$router.go(-1);
        },
        ({ status, data }) => {
          this.toast(data, {
            title: `Error ${status}`,
            toaster: "TC",
            variant: "danger"
          });
        }
      );
    },
    onCancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scope lang="scss"></style>
