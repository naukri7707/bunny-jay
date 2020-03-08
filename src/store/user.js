import axios from "axios";

export default {
  namespaced: true,
  state: {
    uid: -1,
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
            state.uid = res.data.uid;
            state.nickname = res.data.nickname;
            resolve(res);
          })
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
    /** 自動登入 */
    autoLogin({ state }) {
      axios.post("/user/auto-login").then(({ data }) => {
        state.uid = data.uid;
        state.nickname = data.nickname;
      });
    }
  }
};
