<template>
  <b-container id="profile">
    <b-form v-if="form._id">
      <b-input-group class="mb-3" prepend="UID">
        <b-form-input v-model="form._id" disabled></b-form-input>
      </b-input-group>
      <b-input-group class="mb-3" prepend="用戶組">
        <b-form-input
          v-model="usergroup[form.usergroup]"
          disabled
        ></b-form-input>
      </b-input-group>
      <b-input-group class="mb-3" prepend="帳號">
        <b-form-input v-model="form.username" disabled></b-form-input>
      </b-input-group>
      <b-input-group class="mb-3" prepend="暱稱">
        <b-form-input
          v-model="form.nickname"
          :disabled="!isEditingNickname"
        ></b-form-input>
        <b-input-group-append>
          <!-- TODO click 後改為可編輯並跳題視窗 -->
          <template v-if="isEditingNickname">
            <b-button
              text="Button"
              variant="success"
              @click="editNicknameComfirm()"
            >
              確認
            </b-button>
            <b-button
              text="Button"
              variant="info"
              @click="editNicknameCancel()"
            >
              取消
            </b-button>
          </template>
          <b-button v-else text="Button" variant="info" @click="editNickname()">
            編輯
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-alert fade v-show="isEditingNickname" show variant="warning">
        <b-icon-alert-circle font-scale="1.3" />
        32個字內，請避免使用特殊符號。</b-alert
      >
      <b-input-group class="mb-3" prepend="信箱">
        <b-form-input v-model="form.email" disabled></b-form-input>
      </b-input-group>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      usergroup: {
        0: "訪客",
        1: "一般用戶",
        90: "管理員",
        100: "系統管理員"
      },
      form: {
        _id: 0,
        usergroup: 0,
        username: "",
        nickname: "",
        email: ""
      },
      isEditingNickname: false
    };
  },
  created() {
    this.$store.dispatch("user/profile", this.form).then(
      ({ data }) => {
        this.form = data;
      },
      ({ status, data }) => {
        this.toast(data, {
          title: `Error ${status}`,
          variant: "danger"
        });
      }
    );
  },
  methods: {
    editNickname() {
      this.isEditingNickname = true;
    },
    editNicknameCancel() {
      this.isEditingNickname = false;
    },
    editNicknameComfirm() {
      this.$store.dispatch("user/editNickname", this.form.nickname).then(
        () => {
          this.toast(`您現在的暱稱為「${this.form.nickname}」`, {
            title: "更新完成",
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
      this.isEditingNickname = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#profile {
  .input-group-text {
    min-width: 4.5rem;
    place-content: center;
  }
}
</style>
