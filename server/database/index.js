/**
 * 資料庫模型集合
 */
const sessions = require("./session.js");
const users = require("./user.js");
const productsInfos = require("./productsInfo.js");
const products = require("./product.js");
// 建立並導出模型 (資料表)
module.exports = {
  sessions,
  users,
  productsInfos,
  products
};
