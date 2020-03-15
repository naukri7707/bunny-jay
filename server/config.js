module.exports = {
  // 開發環境
  dev: true,
  // 伺服器網域
  domain: "http://localhost:8080",
  // 伺服器連接埠
  port: 8088,
  // 網站路徑
  dist: `${__dirname}/../dist`,
  // 會話 (server 端 cookies)
  session: {
    secret: "secret",
    expires: 14 * 24 * 60 * 60 * 1000
  },
  // 電子郵件
  email: {
    service: "Gmail",
    auth: {
      // 請先開啟 "低安全性應用程式存取權"
      // https://myaccount.google.com/lesssecureapps
      user: "",
      pass: ""
    }
  },
  // 資料庫
  db: {
    // mongoose
    username: "",
    password: "",
    host: "localhost",
    port: 27017,
    database: "bunny-jay",
    // 連結字串
    get uri() {
      return `mongodb://${
        this.username && this.db.password
          ? `${this.username}:${this.password}@`
          : ""
      }${this.host}:${this.port}/${this.database}`;
    }
  }
};
