import axios from "axios";

export default {
  namespaced: true,
  state: {
    login: false,
    nickname: ""
  },
  actions: {
    /** 登入 */
    login({ state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/login", data)
          .then(res => {
            state.nickname = res.data;
            state.login = true;
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
            state.nickname = "";
            state.login = false;
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    /** 自動登入 */
    autologin({ state }) {
      axios.post("/user/auto-login").then(({ data }) => {
        state.nickname = data;
        state.login = true;
      });
    }
  }
};
