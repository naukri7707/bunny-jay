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
