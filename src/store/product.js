import axios from "axios";
import Product from "@/assets/js/product";

export default {
  namespaced: true,
  state: {
    selection: Product.default,
    list: {
      key: new Product("key", "Key", "鑰匙", 0),
      camera: new Product("camera", "Camera", "相機", 3),
      tripod: new Product("tripod", "Tripod", "腳架", 3),
      laptop: new Product("laptop", "Laptop", "筆記型電腦", 0),
      pad: new Product("pad", "Pad", "平板電腦", 3),
      arduino: new Product("arduino", "Arduino", "Arduino", 3),
      vr: new Product("vr", "VR headset", "VR 頭戴裝置", 3),
      drone: new Product("drone", "Drone", "空拍機", 3)
    }
  },
  actions: {
    /** 更新產品狀態 */
    selectProduct(context, product) {
      return new Promise((resolve, reject) => {
        const state = context.state;
        // 更新產品狀態
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
      // 更新產品狀態
      axios
        .get("/product/addRandom", {
          params: {
            product: product,
            name: randomID(7),
            uid: Math.floor(Math.random() * 100),
            deadline: Date.now()
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
