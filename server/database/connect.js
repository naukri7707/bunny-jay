/**
 * 資料庫連線
 * 只在開啟伺服器後由 `/index.js` 引入並執行一次
 */
const mongoose = require("mongoose");
const { uri } = config.db;

// 憑證
mongoose.Promise = global.Promise;

// 在dev狀態開啟調適模式 (在console log 顯示 Mongoose 操作)
mongoose.set("debug", config.dev);
// 新的索引建立方式
mongoose.set("useCreateIndex", true);
//
mongoose.set("useFindAndModify", false);
// 建立連結
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 資料庫連線物件
const { connection } = mongoose;

// 監測錯誤
connection.on("error", err => {
  console.log(`資料庫連接失敗：${err}`);
});

// 連結成功後回調提示訊息
connection.once("open", () => {
  console.log(`資料庫連接成功 ${chalk.cyan(uri)}`);
});

module.exports = {
  connection
};
