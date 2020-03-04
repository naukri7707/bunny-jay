/**
 * 產品路由
 */
const path = "/product";
const router = require("express").Router();

const { productInfos, products } = include("@/database");

// 下一個新產品序列號
let pid = 0;

init(next => {
  // 初始化 pid
  products.aggregate(
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

// 取得產品資訊
router.get("/info", async (req, res) => {
  let doc = await productInfos.find({});
  if (doc) {
    res.status(200).json(doc);
  } else {
    res.status(500).send("找不到資料");
  }
});

// 新增產品資訊
router.post("/addInfo", (req, res) => {
  let data = req.body;
  let pid = 0;
  productInfos.aggregate(
    [{ $group: { _id: null, max: { $max: "$_id" } } }],
    (err, res) => {
      if (res.length === 0) {
        pid = 1;
      } else {
        pid = res[0].max + 1;
      }
    }
  );
  data._id = pid;
  productInfos.create(data, err => {
    if (err) {
      res.status(500).send("新增失敗");
    } else {
      pid++;
      res.status(200).send("新增成功");
    }
  });
});

// 更新產品狀態
router.get("/update", async (req, res) => {
  let doc = await products.find({ product: req.query.product });
  if (doc) {
    res.status(200).json(doc);
  } else {
    res.status(500).send("找不到資料");
  }
});

// 新增隨機資料
router.get("/addRandom", (req, res) => {
  let data = req.query;
  data._id = pid;
  products.create(data, err => {
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
