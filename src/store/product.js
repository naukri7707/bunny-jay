import axios from "axios";
import Product from "@/assets/js/product";

export default {
  namespaced: true,
  state: {
    selection: Product.default,
    list: {},
    userBorrowList: []
  },
  actions: {
    // 取得產品資訊
    getInfo({ state }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/product/info")
          .then(({ data }) => {
            state.list = Product.makeList(data);
            resolve();
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    // 更新產品狀態
    selectProduct({ state }, product) {
      return new Promise((resolve, reject) => {
        axios
          .get("/product/update", {
            params: {
              product
            }
          })
          .then(({ data }) => {
            state.selection = state.list[product];
            let remain = 0;
            for (const p of data) {
              if (p.uid === 0) {
                remain++;
              }
            }
            state.selection.status = { remain, list: data };
            resolve();
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    // 租借產品
    borrow(context, pid) {
      return new Promise((resolve, reject) => {
        axios
          .get("/product/borrow", {
            params: {
              pid
            }
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    getStatus(context, pid) {
      return new Promise((resolve, reject) => {
        axios
          .get("/product/status", {
            params: {
              pid
            }
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    /** 取得使用者借閱狀態 */
    getBorrowList({ state }) {
      axios.get("/product/borrow-list").then(({ data }) => {
        state.userBorrowList = data;
      });
    },
    addRandomData(context) {
      function randomID(length) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      const state = context.state;
      const product = state.selection.key;
      axios
        .get("/product/addRandom", {
          params: {
            product: product,
            name: randomID(7),
            uid: 0,
            borrowTime: 0
          }
        })
        .then(({ data }) => {
          state.selection = state.list[product];
          context.dispatch("selectProduct", product);
          alert(data);
        })
        .catch(err => {
          alert(err.response.data);
        });
    }
  }
};
