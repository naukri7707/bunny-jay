/**
 * 產品資料表
 */
const { Schema } = require("mongoose");
const Model = require("mongoose").model;

/** 資料架構 */
const ProductInfo = new Schema(
  {
    // 關鍵字
    _id: String,
    // 英文名
    name: String,
    // 中文名
    zhName: String,
    // 最大借用天數
    day: Number
  },
  {
    // 不儲存版本號
    versionKey: false
  }
);

// 匯出資料模型 (資料表)
module.exports = new Model("products-info", ProductInfo);
