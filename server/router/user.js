/**
 * 使用者路由
 */
const path = "/user";
const router = require("express").AsyncRouter();
const { users } = include("@/database");

// 下一個新用戶序列號
let uid = 0;

init(next => {
  // 初始化 uid
  users.aggregate(
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
router.postAsync("/login", async (req, res) => {
  const { username, password, option } = req.body;
  const user = await users.findOne({ username });
  if (user === null) {
    res.status(404).send("無此帳號");
  } else if (password !== user.password) {
    res.status(401).send("密碼錯誤");
  } else {
    req.session.regenerate(err => {
      if (err) {
        res.status(500).send("Session Create Error");
      } else {
        // 不保持登入狀態 (使用者關閉瀏覽器後自動刪除客戶端 cookie 的 seesionID)
        if (!option.includes("keep-login")) {
          req.session.cookie.expires = false;
        }
        req.session.uid = user._id;
        res.status(200).send(user.nickname);
      }
    });
  }
});

// 用戶登出
router.post("/logout", (req, res) => {
  if (req.session.uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send("Session Destroy Error");
      } else {
        res.status(204).end();
      }
    });
  }
});

// 用戶註冊
router.post("/sign-up", (req, res) => {
  const data = req.body;
  // TODO 正則驗證
  data._id = uid;
  users.create(data, err => {
    if (err) {
      res.json({ code: 1, msg: err });
    } else {
      uid++;
      res.json({ code: 0, msg: "成功" });
    }
  });
});

// 自動登入
router.postAsync("/auto-login", async (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("已登出，請重新登入");
  } else {
    const user = await users.findById(uid);
    if (user === null) {
      res.status(404).send("找不到該用戶");
    } else {
      res.status(200).send(user.nickname);
    }
  }
});

module.exports = {
  path,
  router
};
