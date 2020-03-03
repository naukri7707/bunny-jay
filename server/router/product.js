/**
 * 產品路由
 */
const path = "/product";
const router = require("express").Router();

const { product } = include("@/database");

// 下一個新產品序列號
let pid = 0;

init(next => {
  // 初始化 pid
  product.aggregate(
    [{ $group: { _id: null, max: { $max: "$_id" } } }],
    (err, res) => {
      if (res.length === 0) {
        pid = 1;
      } else {
        pid = res[0].max + 1;
      }
      next();
    }
  );
});

router.get("/update", async (req, res) => {
  let { target } = req.query;
  let doc = await product.find({ name: target });
  res.status(200).json(doc);
});

router.get("/addRandom", (req, res) => {
  let data = req.query;
  data._id = pid;
  product.create(data, err => {
    if (err) {
      res.status(500).send("新增失敗");
    } else {
      pid++;
      res.status(200).send("新增成功");
    }
  });
});

module.exports = {
  path,
  router
};
