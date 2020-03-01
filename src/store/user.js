import axios from "axios";

export default {
  state: {
    login: false,
    uid: "",
    username: "",
    nickname: ""
  },
  actions: {
    /** 登入 */
    login({ state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/login", data)
          .then(res => {
            state = Object.assign(state, res.data);
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
            state = Object.assign(state, {
              uid: "",
              username: "",
              nickname: ""
            });
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
      axios.post("/user/autologin").then(({ data }) => {
        state = Object.assign(state, data);
        state.login = true;
      });
    }
  }
};
