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
    selectProduct(context, target) {
      return new Promise((resolve, reject) => {
        const state = context.state;
        if (target in state.list) {
          // 選擇產品
          state.selection = state.list[target];
          // 更新產品狀態
          axios
            .get("/product/update", {
              params: {
                target
              }
            })
            .then(({ data }) => {
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
        }
      });
    },
    addRandomData(context) {
      const state = context.state;
      const name = state.selection.key;
      // 更新產品狀態
      axios
        .get("/product/addRandom", {
          params: {
            name,
            uid: Math.floor(Math.random() * 100),
            deadline: Date.now()
          }
        })
        .then(({ data }) => {
          if (name in state.list) {
            // 選擇產品
            state.selection = state.list[name];
            context.dispatch("selectProduct", name);
            alert(data);
          }
        })
        .catch(err => {
          alert(err.response.data);
        });
    }
  }
};
