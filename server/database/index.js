/**
 * 資料庫模型集合
 */
const user = require("./user.js");
const product = require("./product.js");

// 建立並導出模型 (資料表)
module.exports = {
  user,
  product
};
