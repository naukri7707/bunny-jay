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
        const { _id, usergroup, nickname } = user;
        req.session.uid = _id;
        res.status(200).json({ uid: _id, usergroup, nickname });
      }
    });
  }
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
      const { usergroup, nickname } = user;
      res.status(200).json({ uid, usergroup, nickname });
    }
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
router.postAsync("/sign-up", async (req, res) => {
  const data = Object.assign(
    { username: "", password: "", nickname: "", email: "" },
    req.body
  );
  //
  // const legalWordRegex = /^[a-zA-Z0-9~!@#$%^&*()_+`\-={}\[\]:\";\'<>?,.\/]+$/;
  // const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])/;
  // const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // if (data.username.length < 8 || data.username.length > 32) {
  //   res.status(406).send("帳號長度需介於8至32之間");
  // } else if (legalWordRegex.test(data.username) === false) {
  //   res.status(406).send("帳號含有非法字元");
  // } else if (data.password.length < 8 || data.password.length > 32) {
  //   res.status(406).send("密碼長度需介於8至32之間");
  // } else if (legalWordRegex.test(data.password) === false) {
  //   res.status(406).send("密碼含有非法字元");
  // } else if (passwordRegex.test(data.password) === false) {
  //   res.status(406).send("密碼需包含英文和數字");
  // } else if (!data.email || emailRegex.test(data.email) === false) {
  //   res.status(406).send("無效的信箱");
  // } else {
  data._id = uid;
  data.usergroup = 1;
  await users.create(data);
  uid++;
  res.status(204).end();
  //}
});

router.getAsync("/profile", async (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    const user = await users.findById(uid, ["username", "nickname"]);
    res.status(200).send(user);
  }
});

// 攔截部分 user 異常事件
router.use((err, req, res, next) => {
  if (err.name === "MongoError" && err.code === 11000) {
    if (err.keyPattern.username) {
      res.status(406).send("該帳號已被註冊");
    } else if (err.keyPattern.email) {
      res.status(406).send("該電子信箱已被使用");
    } else {
      next(err);
    }
  } else {
    next(err);
  }
});

module.exports = {
  path,
  router
};
