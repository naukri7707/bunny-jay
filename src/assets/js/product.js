export default class Product {
  /** 圖片存放路徑 */
  static imgUrl = "assets/img/product";

  /** 空產品 */
  static default = { status: { remain: -99, list: [] } };

  static makeList(data) {
    let res = {};
    for (let d of data) {
      res[d._id] = new Product(d._id, d.name, d.zhName, d.day);
    }
    return res;
  }

  /**
   * @param {string} key 鍵值
   * @param {string} name 英文名
   * @param {string} zhName 中文名
   * @param {number} day 租借天數
   */
  constructor(key, name, zhName, day) {
    this.key = key;
    this.name = name;
    this.zhName = zhName;
    this.day = day;
    this.status = {
      remain: -99,
      list: []
    };
  }

  /** 租借頁背景圖 */
  get background() {
    return require(`@/${Product.imgUrl}/${this.key}_bg.png`);
  }

  /** 可租借圖示 */
  get iconOn() {
    return require(`@/${Product.imgUrl}/${this.key}_on.png`);
  }

  /** 不可租借圖示 */
  get iconOff() {
    return require(`@/${Product.imgUrl}/${this.key}_off.png`);
  }

  /** 側邊欄圖示 */
  get iconSide() {
    return require(`@/${Product.imgUrl}/${this.key}_side.png`);
  }
}
