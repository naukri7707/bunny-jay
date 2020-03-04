/**
 * 產品路由
 */
const path = "/product";
const router = require("express").Router();

const { users, productsInfos, products } = include("@/database");

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
  let doc = await productsInfos.find({});
  if (doc) {
    res.status(200).json(doc);
  } else {
    res.status(500).send("找不到資料");
  }
});

// 新增產品資訊
router.post("/addInfo", (req, res) => {
  let data = req.body;

  productsInfos.create(data, err => {
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
    let doc = await products.find({ product: req.query.product });
    res.status(200).json(doc);
  } else {
    res.status(500).send("找不到資料");
  }
});

// 取得指定產品資訊
router.get("/status", async (req, res) => {
  let pid = parseInt(req.query.pid);
  let product = await products.findById(pid, err => {
    if (err) {
      res.status(500).send("資料庫錯誤");
      return;
    }
  });
  if (product === null) {
    res.status(500).send("查無此產品");
    return;
  }
  let user = await users.findById(product.uid, err => {
    if (err) {
      res.status(500).send("資料庫錯誤");
      return;
    }
  });
  if (user === null) {
    res.status(500).send("查無此用戶");
  } else {
    let { username, nickname } = user;
    res.status(200).json({ username, nickname });
  }
});

// 租借產品
router.get("/borrow", async (req, res) => {
  const userSession = req.session.user;
  const { pid } = req.query;
  if (userSession) {
    if (userSession.uid) {
      let doc = await products.findById(pid);
      if (doc) {
        if (doc.uid === 0) {
          let { day } = await productsInfos.findById(doc.product);
          let data = {
            uid: userSession.uid,
            deadline: new Date(new Date().setDate(new Date().getDate() + day))
          };
          products.findByIdAndUpdate(pid, data, { new: true }, err => {
            if (err) {
              res.status(500).send("資料庫錯誤");
            } else {
              res.status(200).json(data);
            }
          });
        } else {
          res.status(500).send("該產品已被租借");
        }
      } else {
        res.status(500).send("找不到目標產品");
      }
    } else {
      res.status(401).send("找不到該用戶");
    }
  } else {
    res.status(401).send("請先登入");
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
