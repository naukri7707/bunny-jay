module.exports = {
  /** 開發環境 */
  dev: true,
  /** 伺服器 */
  app: {
    port: 8088,
    /** 網站路徑 */
    dist: `${__dirname}/../dist`
  },
  /** 資料庫 */
  db: {
    // mongoose
    username: "",
    password: "",
    host: "localhost",
    port: 27017,
    database: "bunny-jay",
    /** 連結字串 */
    get uri() {
      return `mongodb://${
        this.username && this.db.password
          ? `${this.username}:${this.password}@`
          : ""
      }${this.host}:${this.port}/${this.database}`;
    }
  }
};
