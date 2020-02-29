import axios from "axios";

export default {
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
            state.login = true;
            state.nickname = res.data;
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    }
  }
};
