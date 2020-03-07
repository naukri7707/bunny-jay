/**
 * 產品資料表
 */
const { Schema } = require("mongoose");
const Model = require("mongoose").model;

/** 資料架構 */
const Product = new Schema(
  {
    // pid
    _id: Number,
    // 產品類
    product: { type: String, index: true },
    // 產品名
    name: String,
    // 使用者
    uid: { type: Number, index: true },
    // 使用期限
    deadline: Number
  },
  {
    // 不儲存版本號
    versionKey: false
  }
);

// 匯出資料模型 (資料表)
module.exports = new Model("product", Product);
