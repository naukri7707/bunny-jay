/**
 * 使用者路由
 */
const path = "/user";
const router = require("express").Router();

const { user } = include("@/database");

// 下一個新用戶序列號
let uid = 0;

init(next => {
  // 初始化 uid
  user.aggregate(
    [{ $group: { _id: null, max: { $max: "$_id" } } }],
    (err, res) => {
      if (res.length === 0) {
        uid = 1;
      } else {
        uid = res[0].max + 1;
      }
      next();
    }
  );
});

// 用戶登入
router.post("/login", async (req, res) => {
  const { username, password, option } = req.body;
  const doc = await user.findOne({ username });
  if (doc) {
    if (password === doc.password) {
      req.session.regenerate(err => {
        if (err) {
          res.status(500).send("Session Create Error");
        } else {
          if (!option.includes("keep-login")) {
            req.session.cookie.expires = false;
          }
          req.session.user = {
            uid: doc._id
          };
          res.status(200).json({
            uid: doc._id,
            username: doc.username,
            nickname: doc.nickname
          });
        }
      });
    } else {
      res.status(401).send("密碼錯誤");
    }
  } else {
    res.status(401).send("無此帳號");
  }
});

// 用戶登出
router.post("/logout", async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send("Session Destroy Error");
    } else {
      res.status(200).send("登出完成");
    }
  });
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

// 自動登入
router.post("/autologin", async (req, res) => {
  const userSession = req.session.user;
  if (userSession) {
    if (userSession.uid) {
      const doc = await user.findById(userSession.uid);
      if (doc) {
        res.status(200).json({
          uid: doc._id,
          username: doc.username,
          nickname: doc.nickname
        });
      } else {
        res.status(401).send("找不到該用戶");
      }
    } else {
      res.status(401).send("已登出，請重新登入");
    }
  } else {
    res.status(401).send("沒有用戶資訊");
  }
});

module.exports = {
  path,
  router
};
