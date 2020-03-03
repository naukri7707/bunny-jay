/**
 * 是否介於最大和最小值之間
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
Number.prototype.inRange = function(min, max) {
  return this >= min && this <= max;
};

/**
 * 將字串轉換成整數
 * @param {number} radix 基數
 */
String.prototype.toInt = function(radix = 10) {
  return parseInt(this, radix);
};

/**
 * 將字串轉換成浮點數
 */
String.prototype.toFloat = function() {
  return parseFloat(this);
};

/**
 * 檢查該索引是否在合理範圍
 * @param {number} index 索引
 */
Array.prototype.legalIndex = function(index) {
  return index >= 0 && index < this.length;
};

/**
 * 日期格式化工具
 * @param {string} fmt 格式
 */
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小時
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
