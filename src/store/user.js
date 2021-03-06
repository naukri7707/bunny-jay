import axios from "axios";

export default {
  namespaced: true,
  state: {
    uid: -1,
    usergroup: 0,
    nickname: "",
    get login() {
      return this.uid !== -1;
    }
  },
  actions: {
    /** 登入 */
    login({ state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/login", data)
          .then(res => {
            const { uid, usergroup, nickname } = res.data;
            state.uid = uid;
            state.usergroup = usergroup;
            state.nickname = nickname;
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    /** 自動登入 */
    autoLogin({ state }) {
      axios.post("/user/auto-login").then(({ data }) => {
        const { uid, usergroup, nickname } = data;
        state.uid = uid;
        state.usergroup = usergroup;
        state.nickname = nickname;
      });
    },
    checkLogin() {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/check-login")
          .then(() => {})
          .catch(err => {
            reject(err.response);
          });
      });
    },
    logout({ state }) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/logout")
          .then(() => {
            let res = state.nickname;
            state.uid = -1;
            state.nickname = "";
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    forgotPassword(context, username) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/forgot-password", { username })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    resetPassword(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/reset-password", data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    profile() {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/profile")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    editNickname({ state }, nickname) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/edit-nickname", { nickname })
          .then(({ data }) => {
            state.nickname = data;
            resolve();
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    changePassword(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/change-password", data)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    loginDevice() {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/login-device")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    logoutDevice(context, sid) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/logout-device", { sid })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    logoutAllDevice() {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/logout-all-device")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    }
  }
};
