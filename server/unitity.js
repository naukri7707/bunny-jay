/**
 * 通用變數
 */
global.include = id => {
  if (id[0] === "@") {
    return require(id.replace("@", __dirname));
  } else {
    return require(id);
  }
};

global.config = require("./config.js");
global.chalk = require("chalk"); // console log 色彩工具
