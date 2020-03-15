/**
 * 通用變數
 */

/**
 * 使用基於`@`路徑的相對位置引入模組
 * @param {string} id 相對路徑
 */
global.include = id => {
  if (id[0] === "@") {
    return require(id.replace("@", __dirname));
  } else {
    return require(id);
  }
};

/**
 * 異步初始化模組
 * @param {...function} func 欲用來初始化的方法
 */
global.init = (...func) => {
  function wrapper(main, wrap) {
    return () => {
      main(wrap);
    };
  }
  func.push(() => {});
  for (let i = func.length - 2; i >= 0; i--) {
    func[i] = wrapper(func[i], func[i + 1]);
  }
  func[0]();
};

String.prototype.getHashCode = function() {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

String.prototype.getHashString = function() {
  const chs =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
  let hash = this.getHashCode() >>> 0;
  let res = "";
  while (hash) {
    res += chs[hash & 63];
    hash >>>= 6;
  }
  return res;
};

global.config = require("./config.js");
global.chalk = require("chalk"); // console log 色彩工具
