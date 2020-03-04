// 預設的 toast 選項
const DEFAULT_OPTION = {
  toaster: "TC",
  solid: true
};

// option.toaster 的關鍵字
const TOASTER = {
  TR: "b-toaster-top-right",
  TL: "b-toaster-top-left",
  TC: "b-toaster-top-center",
  TF: "b-toaster-top-full",
  BR: "b-toaster-bottom-right",
  BL: "b-toaster-bottom-left",
  BC: "b-toaster-bottom-center",
  BF: "b-toaster-bottom-full"
};

export default {
  methods: {
    /**
     * 在根物件產生一個 Toast
     * @param {string} msg    內容
     * @param {object} option 樣式選項
     */
    toast(msg, option = {}) {
      option = Object.assign(DEFAULT_OPTION, option);
      if (Object.prototype.hasOwnProperty.call(TOASTER, option.toaster)) {
        option.toaster = TOASTER[option.toaster];
      }
      this.$root.$bvToast.toast(msg, option);
    }
  }
};
