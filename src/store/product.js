import axios from "axios";
import Product from "@/assets/js/product";

export default {
  namespaced: true,
  state: {
    selectionInfo: Product.default,
    infoList: {},
    userBorrowList: []
  },
  actions: {
    // 取得產品資訊
    infoList({ state }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/product/info-list")
          .then(({ data }) => {
            state.infoList = Product.makeList(data);
            resolve();
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    // 更新產品狀態
    update({ state }, product) {
      return new Promise((resolve, reject) => {
        if (product in state.infoList) {
          state.selectionInfo.status = { remain: -99, list: [] };
          state.selectionInfo = state.infoList[product];
          axios
            .get("/product/update", {
              params: {
                product
              }
            })
            .then(({ data }) => {
              let remain = 0;
              for (const p of data) {
                if (p.uid === 0) {
                  remain++;
                }
              }
              state.selectionInfo.status = { remain, list: data };
              resolve();
            })
            .catch(err => {
              reject(err.response);
            });
        } else {
          reject(new Error("無此產品"));
        }
      });
    },
    // 租借產品
    borrow(context, pid) {
      return new Promise((resolve, reject) => {
        axios
          .post("/product/borrow", {
            pid
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    // 回收產品
    retrieve(context, pid) {
      return new Promise((resolve, reject) => {
        axios
          .post("/product/retrieve", {
            pid
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    // 取得指定產品狀態
    status(context, pid) {
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
    // 取得使用者借閱狀態
    userBorrowList({ state }) {
      axios.get("/product/user-borrow-list").then(({ data }) => {
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
      const product = state.selectionInfo.key;
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
          state.selectionInfo = state.infoList[product];
          context.dispatch("update", product);
          alert(data);
        })
        .catch(err => {
          alert(err.response.data);
        });
    }
  }
};
