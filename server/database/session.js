/**
 * 會談資料表
 */
const { Schema } = require("mongoose");
const Model = require("mongoose").model;

/** 資料架構 */
const Session = new Schema(
  {
    // pid
    _id: String,
    // 時效
    expires: Date,
    // 資料
    session: Object
  },
  {
    // 不儲存版本號
    versionKey: false
  }
);

// 匯出資料模型 (資料表)
module.exports = new Model("session", Session);
