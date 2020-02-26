/**
 * 產品路由
 */
const path = "/product";
const router = require("express").Router();

const { product } = include("@/database");

router.get("/update", async (req, res) => {
  let { target } = req.query;
  let doc = await product[target].find();
  res.json({
    remain: 10,
    list: doc
  });
});

router.get("/addRandom", (req, res) => {
  let { target, user, deadline } = req.query;
  product[target].create({ user, deadline }, err => {
    if (err) {
      res.json({ code: 1, msg: err });
    } else {
      res.json({ code: 0, msg: "成功" });
    }
  });
});

module.exports = {
  path,
  router
};
