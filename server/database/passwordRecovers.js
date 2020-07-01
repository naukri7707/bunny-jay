/**
 * 產品資料表
 */
const { Schema } = require("mongoose");
const Model = require("mongoose").model;

/** 資料架構 */
const PasswordRecovers = new Schema(
  {
    // _id = vid = 網址的Hash, 由 mongoDB 自動產生
    // UID
    uid: Number,
    // 期限
    deadtime: Number
  },
  {
    // 不儲存版本號
    versionKey: false
  }
);

// 匯出資料模型 (資料表)
module.exports = new Model("password-recovers", PasswordRecovers);
