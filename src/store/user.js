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
    }
  }
};
