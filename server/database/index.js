/**
 * 資料庫模型集合
 */
const users = require("./user.js");
const productInfos = require("./productInfo.js");
const products = require("./product.js");
// 建立並導出模型 (資料表)
module.exports = {
  users,
  productInfos,
  products
};
