/**
 * 產品資料表
 */
const { Schema } = require("mongoose");
const Model = require("mongoose").model;

/** 資料架構 */
const Product = new Schema(
  {
    // 使用者
    user: String,
    // 使用期限
    deadline: Number
  },
  {
    // 不儲存版本號
    versionKey: false
  }
);

// 匯出資料模型 (資料表)
module.exports = {
  key: new Model("key", Product),
  camera: new Model("camera", Product),
  tripod: new Model("tripod", Product),
  laptop: new Model("laptop", Product),
  pad: new Model("pad", Product),
  arduino: new Model("arduino", Product),
  vr: new Model("vr", Product),
  drone: new Model("drone", Product)
};
