import axios from "axios";

export default {
  state: {},
  actions: {
    /** 登入 */
    login(context, data) {
      const state = context.state;
      axios
        .post("/user/login", data)
        .then(res => {
          state.selection.status = res.data;
        })
        .catch(err => {
          alert(`資料更新失敗\n\n${err}`);
        });
    }
  }
};
