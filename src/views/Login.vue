<template>
  <b-container id="login">
    <h1>LOGIN</h1>
    <b-row>
      <b-form @submit.prevent="onSubmit">
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
      prevPage: "/",
      form: {
        username: "",
        password: "",
        option: []
      }
    };
  },
  methods: {
    onSubmit() {
      function agent() {
        let { platform, userAgent } = navigator;
        let os = "Unknown";
        if (
          ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(platform) !== -1
        ) {
          os = "Mac OS";
        } else if (["iPhone", "iPad", "iPod"].indexOf(platform) !== -1) {
          os = "iOS";
        } else if (
          ["Win32", "Win64", "Windows", "WinCE"].indexOf(platform) !== -1
        ) {
          os = "Windows";
        } else if (/Android/.test(userAgent)) {
          os = "Android";
        } else if (/Linux/.test(platform)) {
          os = "Linux";
        }
        let keys = [
          "Unknown",
          "rv",
          "Firefox",
          "Edge",
          "Safari",
          "Chrome",
          "Opera"
        ];
        let i = keys.length;
        while (--i && userAgent.indexOf(keys[i]) === -1);

        return `${os} (${i === 1 ? "IE" : keys[i]})`;
      }
      this.$store
        .dispatch("user/login", Object.assign(this.form, { agent: agent() }))
        .then(
          ({ data }) => {
            this.toast(`歡迎回來，${data.nickname}`, {
              title: "登入成功",
              variant: "success"
            });

            if (this.prevPage === "/") {
              this.$router.push("/");
            } else {
              this.$router.go(-1); // 這樣才能保留 query
            }
          },
          ({ status, data }) => {
            this.toast(data, {
              title: `Error ${status}`,
              variant: "danger"
            });
          }
        );
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevPage = from.path;
      next();
    });
  }
};
</script>

<style scope lang="scss"></style>
