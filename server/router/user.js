/**
 * 使用者路由
 */
const path = "/user";
const nodemailer = require("nodemailer");
const router = require("express").AsyncRouter();
const { sessions, users } = include("@/database");

var transporter = nodemailer.createTransport(config.email);
// 下一個新用戶流水號
let uid = 0;
// 金鑰
let keys = [];
let kid = 14; // length - 1， 讓下一周期歸 0

init(
  next => {
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
  },
  next => {
    // 初始化金鑰陣列
    keys[0] = Date.now()
      .toString()
      .getHashString();
    for (let i = 1; i < 15; i++) {
      keys[i] = keys[i - 1].getHashString();
    }
    // 定時刷新金鑰 (15分鐘過期)
    setInterval(() => {
      kid = (kid + 1) % 15;
      keys[kid] = keys[kid === 0 ? 14 : kid - 1].getHashString();
    }, 60 * 1000);
    next();
  }
);

function getResetKey(email, password) {
  return email.getHashString() + password.getHashString() + keys[kid];
}

function vaildataResetKey(email, password, vid) {
  const main = email.getHashString() + password.getHashString();
  for (let i = main.length - 1; i >= 0; i--) {
    if (main[i] != vid[i]) {
      return 1;
    }
  }
  for (let i = 0; i < 15; i++) {
    if (main + keys[i] === vid) {
      return 0;
    }
  }
  return 2;
}

// TODO password validation function

// 重設密碼
router.postAsync("/reset-password", async (req, res) => {
  const { uid, vid, newPassword } = req.body;
  const { email, password } = await users.findById(uid, "email password");
  switch (vaildataResetKey(email, password, vid)) {
    case 2:
      res.status(403).send("驗證已過期");
      break;
    case 1:
      res.status(401).send("無效的驗證");
      break;
    case 0:
      // TODO 檢查密碼合法
      await users.findByIdAndUpdate(uid, { password: newPassword });
      res.status(200).send("重設成功");
      break;
    default:
      break;
  }
});

// 忘記密碼
router.postAsync("/forgot-password", async (req, res) => {
  let { email } = req.body;
  let { _id, password, nickname } = await users.findOne(
    { email },
    "password nickname"
  );
  // reset link
  let link = `${config.domain}/reset-password?uid=${_id}&vid=${getResetKey(
    email,
    password
  )}`;

  // send mail
  await transporter.sendMail({
    from: `bunny-jay <${config.email.auth.user}>`,
    to: email,
    subject: "重置您的密碼",
    html: `
    <div
    style="font-family: Noto Sans TC, Microsoft YaHei, 微軟正黑體;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0 10rem;"
  >
    <div>
      <h1 style="padding-left: 1rem;">Bunny Jay</h1>
      <hr style="border: 5px solid #416C78; margin:0" />
      <div
        style="background-color: #e2e2e2;
      padding: 2rem 1rem 3rem;"
      >
        <h3>
          您好, ${nickname}
        </h3>
        <p>
          請點擊按鈕以重置您的密碼。如果您沒有申請相關服務，請忽略這封郵件，並注意帳號安全。
        </p>
        <div
          style="margin-top: 8rem;
        text-align: center;"
        >
          <a
            style="text-decoration: none;
          color: #4a4a4a;
          padding: 0.25rem;
          border-radius: 0.5rem;
          border-style: outset;
          background-color: #ededed;
          border-color: #ededed;
            "
            href="${link}"
            >重置我的密碼</a
          >
        </div>
      </div>
    </div>
  </div>  
      `
  });
  res.status(200).send("郵件已寄出");
});

// 用戶登入
router.postAsync("/login", async (req, res) => {
  const { username, password, option, agent } = req.body;
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
        req.session.agent = agent;
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

// 檢查登入
router.get("/check-login", (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    res.status(204).end();
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
  // TODO 暱稱
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

// 取得用戶資訊
router.getAsync("/profile", async (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    const user = await users.findById(uid, [
      "username",
      "nickname",
      "email",
      "usergroup"
    ]);
    res.status(200).send(user);
  }
});

router.postAsync("/edit-nickname", async (req, res) => {
  const { uid } = req.session;
  const nickname = req.body.nickname || "";
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else if (nickname.length === 0) {
    res.status(406).send("暱稱不可為空");
  } else if (nickname.length > 32) {
    res.status(406).send("暱稱長度不可超過 30 字");
  } else {
    await users.findByIdAndUpdate(uid, { nickname });
    res.status(200).send(nickname);
  }
});

router.postAsync("/change-password", async (req, res) => {
  const { uid } = req.session;
  const { oldPassword, newPassword } = Object.assign(
    { oldPassword: "", newPassword: "" },
    req.body
  );
  // TODO 正則驗證
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else if (oldPassword === "" || newPassword === "") {
    res.status(406).send("欄位不可為空");
  } else if (oldPassword === newPassword) {
    res.status(406).send("新舊密碼相同");
  } else if (newPassword.length < 8 || newPassword.length > 32) {
    res.status(406).send("密碼長度需介於8至32之間");
  } else {
    let user = await users.findOne({ _id: uid, password: oldPassword });
    if (user === null) {
      res.status(406).send("密碼不正確");
    } else {
      await users.findByIdAndUpdate(uid, { password: newPassword });
      await sessions.deleteMany({ "session.uid": uid });
      res.status(204).end();
    }
  }
});

router.getAsync("/login-device", async (req, res) => {
  const { uid, id } = req.session;
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    const session = await sessions.find({ "session.uid": uid });
    res.status(200).json(
      session.map(item => {
        return {
          current: item._id === id,
          _id: item._id,
          agent: item.session.agent,
          date: item.expires - item.session.cookie.originalMaxAge
        };
      })
    );
  }
});

router.postAsync("/logout-device", async (req, res) => {
  const { uid } = req.session;
  const sid = req.body.sid || "";
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else if (sid === "") {
    res.status(401).send("沒有目標");
  } else {
    const resp = await sessions.deleteOne({ _id: sid, "session.uid": uid });
    res.status(200).json(resp);
  }
});

router.postAsync("/logout-all-device", async (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    const resp = await sessions.deleteMany({ "session.uid": uid });
    res.status(200).json(resp);
  }
});

router.postAsync("/coffee", async (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("尚未登入");
  } else {
    res.status(418).send("當前伺服器為一個茶壺，因此拒絕沖泡咖啡");
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
