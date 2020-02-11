import axios from "axios";
import Product from "@/assets/js/product";

export default {
  state: {
    selection: Product,
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
      const state = context.state;
      if (target in state.list) {
        // 選擇產品
        state.selection = state.list[target];
        // 更新產品狀態
        axios
          .get("/product/update", {
            params: {
              product: target
            }
          })
          .then(res => {
            state.selection.status = res.data;
          })
          .catch(err => {
            alert(`資料更新失敗\n\n${err}`);
          });
      }
    }
  }
};
