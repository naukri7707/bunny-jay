/**
 * 開發路由
 * 只在開發環境下回傳完整設定，否則回傳空路由
 */
const path = "/";
const router = require("express").Router();

module.exports = {
  path,
  router: config.dev ? router : require("express").Router()
};
