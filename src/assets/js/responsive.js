export default class Responsive {
  /** 畫面寬度閾值 min <= width < max */
  static WIDTH = {
    XS: { min: 0, max: 576 },
    SM: { min: 576, max: 768 },
    MD: { min: 768, max: 992 },
    LG: { min: 992, max: 1200 },
    XL: { min: 1200, max: Number.MAX_VALUE }
  };

  /** 取得當前響應式寬度 */
  static get currentWidth() {
    let res = "";
    for (let key in Responsive.WIDTH) {
      const value = Responsive.WIDTH[key];
      res = key;
      if (window.innerWidth < value.max) {
        break;
      }
    }
    return res;
  }

  /** 響應寬度比較工具 */
  static windowWidth = {
    ">": width => {
      return window.innerWidth >= Responsive.WIDTH[width].max;
    },
    ">=": width => {
      return window.innerWidth >= Responsive.WIDTH[width].min;
    },
    "==": width => {
      return (
        window.innerWidth >= Responsive.WIDTH[width].min &&
        window.innerWidth < Responsive.WIDTH[width].max
      );
    },
    "<=": width => {
      return window.innerWidth < Responsive.WIDTH[width].max;
    },
    "<": width => {
      return window.innerWidth < Responsive.WIDTH[width].min;
    }
  };
}
