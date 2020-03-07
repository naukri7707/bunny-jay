/**
 * 主路由
 */
const path = "/";
const router = require("express").Router();
// 引用所有路由
const indexRouter = { path, router };
const devRouter = require("./dev.js");
const userRouter = require("./user.js");
const productRouter = require("./product.js");
const handlerRouter = require("./handler.js");

module.exports = [
  indexRouter,
  devRouter,
  userRouter,
  productRouter,
  handlerRouter
];
