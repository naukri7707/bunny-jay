// import
const express = require("express"); // 伺服器工具
const chalk = require("chalk"); // console log 色彩工具

/** 生產網站路徑 */
const CLIENT_PATH = `${__dirname}/../dist`;

/** 連線物件 */
const app = express();

/** 連接埠 */
const port = process.env.PORT || 8088;

// initial
app.use(express.static(CLIENT_PATH));

// get
app.get("/", (req, res) => {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

app.get("/test", (req, res) => {
  res.send("10");
});

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
