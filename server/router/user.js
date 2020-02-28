/**
 * 使用者路由
 */
const path = "/user";
const router = require("express").Router();

router.post("/login", async (req, res) => {
  // let { username, password } = req.body;
  // TODO 搜索用戶登入
  res.json({});
});

module.exports = {
  path,
  router
};
