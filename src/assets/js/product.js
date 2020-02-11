export default class Product {
  /** 在src資料夾下存放的路徑 */
  static baseUrl = "assets/img/product";

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
      remain: NaN,
      list: []
    };
  }

  /** 租借頁背景圖 */
  get background() {
    return require(`@/${Product.baseUrl}/${this.key}_bg.png`);
  }

  /** 可租借圖示 */
  get iconOn() {
    return require(`@/${Product.baseUrl}/${this.key}_on.png`);
  }

  /** 不可租借圖示 */
  get iconOff() {
    return require(`@/${Product.baseUrl}/${this.key}_off.png`);
  }

  /** 側邊欄圖示 */
  get iconSide() {
    return require(`@/${Product.baseUrl}/${this.key}_side.png`);
  }
}
