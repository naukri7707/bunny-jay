// global import
require("./unitity");
// import
const express = require("express"); // 伺服器
const session = require("express-session"); // session
const bodyParser = require("body-parser"); // 請求解析
require("./asyncRouter").init(); // 異步路由異常處理工具
const { connection } = require("./database/connect"); // 連結至資料庫
const MongoStore = require("connect-mongo")(session); // 將 express-session 儲存至 mongoDB
const routers = require("./router"); // 路由
/** 連線物件 */
const app = express();

// initial
app.use(express.static(config.dist));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: config.session.secret,
    store: new MongoStore({
      url: config.db.uri,
      mongooseConnection: connection,
      stringify: false
    }),
    cookie: { maxAge: config.session.expires }
  })
);

// routers
routers.forEach(it => {
  app.use(it.path, it.router);
});

// 啟動伺服器
app.listen(config.port, err => {
  if (err) {
    console.log(chalk.red(`Server Failed to Start`));
  } else {
    console.log(
      `
  Server started at: ${chalk.cyan(`http://localhost:${config.port}/`)}
  Press Ctrl + C to stop
  `
    );
  }
});
