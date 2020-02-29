/**
 * 使用者路由
 */
const path = "/user";
const router = require("express").Router();

const { user } = include("@/database");

// 當前用戶序列號
let uid = 0;

// 初始化 uid
user
  .find({})
  .sort({ uid: -1 })
  .limit(1)
  .exec((err, doc) => {
    if (err || !doc) {
      console.log("User ID 初始化失敗");
    } else {
      uid = doc[0]._id + 1;
    }
  });

// 用戶登入
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const doc = await user.findOne({ username });
  if (doc) {
    if (password === doc.password) {
      req.session.regenerate(err => {
        if (err) {
          res.status(500).send("Session Error");
        } else {
          req.session.userinfo = doc;
          res.status(200).send(doc.nickname);
        }
      });
    } else {
      res.status(401).send("密碼錯誤");
    }
  } else {
    res.status(401).send("無此帳號");
  }
});

// 用戶註冊
router.post("/sign-up", async (req, res) => {
  const data = req.body;
  // TODO 正則驗證
  data._id = uid;
  user.create(data, err => {
    if (err) {
      res.json({ code: 1, msg: err });
    } else {
      uid++;
      res.json({ code: 0, msg: "成功" });
    }
  });
});

module.exports = {
  path,
  router
};
