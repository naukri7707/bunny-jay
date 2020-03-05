/**
 * 異步路由異常處理工具
 * 在根進入點呼叫 asyncRouter.init() 完成初始化
 * 之後使用 express.AsyncRouter() 引入異步路由
 */
const assert = require("assert");
const express = require("express");

function wrap(callback) {
  return function(req, res, next) {
    callback(req, res, next).catch(next);
  };
}

function init(
  defaultOption = ["delete", "get", "head", "patch", "post", "put", "use"]
) {
  function wrapper(name, funcs) {
    let res = [];
    for (let f of funcs) {
      let type = Object.prototype.toString.call(f);
      switch (type) {
        case "[object AsyncFunction]":
          res.push(wrap(f));
          break;
        case "[object Function]":
          res.push(f);
          break;
        default:
          assert(
            false,
            `Route.${name} requires a callback function but got a ${type}`
          );
          break;
      }
    }
    return res;
  }

  express.AsyncRouter = (option = defaultOption) => {
    const res = express.Router();

    for (const op of option) {
      let newFunc = `${op}Async`;
      res[newFunc] = function(path, ...callback) {
        res[op](path, wrapper(op, callback));
      };
    }

    return res;
  };
}

module.exports = {
  init,
  wrap
};
