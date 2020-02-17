// global import
require("./unitity");
// import
const express = require("express"); // 伺服器工具
require("./database/connect.js"); // 連結至資料庫
const { port, dist } = config.app; // 設定檔
const routers = require("./router"); // 路由
/** 連線物件 */
const app = express();

// initial
app.use(express.static(dist));
// routers
routers.forEach(it => {
  app.use(it.path, it.router);
});

// TODO 在初始化時讀取全部產品剩餘數量並存成變數減少資料庫操作頻率

// 啟動伺服器
app.listen(port, err => {
  if (err) {
    console.log(chalk.red(`Server Failed to Start`));
  } else {
    console.log(
      `
  Server started at: ${chalk.cyan(`http://localhost:${port}/`)}
  Press Ctrl + C to stop
  `
    );
  }
});
