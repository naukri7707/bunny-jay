/**
 * 用戶資料表
 */
const { Schema } = require("mongoose");
const Model = require("mongoose").model;

/** 資料架構 */
const User = new Schema(
  {
    // UID
    _id: Number,
    // 用戶組
    usergroup: Number,
    // 帳號
    username: { type: String, unique: true },
    // 密碼
    password: String,
    // 暱稱
    nickname: String,
    // 電子信箱
    email: { type: String, unique: true }
    // ...
  },
  {
    // 不儲存版本號
    versionKey: false
  }
);

// 匯出資料模型 (資料表)
module.exports = new Model("user", User);
