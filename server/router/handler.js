/**
 * 重新導向路由
 */
const path = "/";
const router = require("express").Router();

// 攔截所有未被定義的 get 事件、並將其以參數`link`的形式傳遞至根
// 配合 App.vue 在載入時的自動導向來讓外部的非根連結可以正確載入
router.get("*", (req, res) => {
  res.redirect(`/?link=${req.path}`);
});

// 異常處理
// 攔截所有未被處理的事件並回傳異常資訊
router.use((err, req, res) => {
  res.status(500).send(err.message);
});

module.exports = {
  path,
  router
};
