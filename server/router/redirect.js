/**
 * 重新導向路由
 */
const path = "/";
const router = require("express").Router();

router.get("*", (req, res) => {
  res.redirect(`/?link=${req.path}`);
});

module.exports = {
  path,
  router
};
