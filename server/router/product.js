/**
 * 產品路由
 */
const path = "/product";
const router = require("express").AsyncRouter();

const { users, productsInfos, products } = include("@/database");

// 下一個新產品序列號
let pid = 0;

init(
  next => {
    Date.today = (offset = 0) => {
      return new Date().setHours(0, 0, 0, 0) + 86400000 * offset;
    };
    next();
  },
  next => {
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
  }
);

// 取得產品資訊
router.getAsync("/info", async (req, res) => {
  let infos = await productsInfos.find();
  if (infos === null) {
    res.status(404).send("找不到資料");
  } else {
    res.status(200).json(infos);
  }
});

// 新增產品資訊
router.post("/add-info", (req, res) => {
  productsInfos.create(req.body, err => {
    if (err) {
      res.status(500).send("新增失敗");
    } else {
      res.status(201).send("新增成功");
    }
  });
});

// 更新產品狀態
router.getAsync("/update", async (req, res) => {
  let product = await products.find({ product: req.query.product });
  if (product === null) {
    res.status(404).send("找不到資料");
  } else {
    res.status(200).json(product);
  }
});

// 取得指定產品資訊
router.getAsync("/status", async (req, res) => {
  let pid = parseInt(req.query.pid);
  let product = await products.findById(pid);
  if (product === null) {
    res.status(404).send("查無此產品");
    return;
  }
  let user = await users.findById(product.uid);
  if (user === null) {
    res.status(404).send("查無此用戶");
  } else {
    let { username, nickname } = user;
    res.status(200).json({ username, nickname });
  }
});

// 租借產品
router.getAsync("/borrow", async (req, res) => {
  const { uid } = req.session;
  const { pid } = req.query;
  if (uid === undefined) {
    res.status(401).send("請先登入");
    return;
  }
  let doc = await products.findById(pid);
  if (doc === null) {
    res.status(500).send("找不到目標產品");
    return;
  }
  if (doc.uid !== 0) {
    res.status(500).send("該產品已被租借");
  } else {
    let data = { uid, borrowTime: Date.today() };
    await products.findByIdAndUpdate(pid, data);
    res.status(200).json(data);
  }
});

// 取得使用者租借狀態
router.getAsync("/borrow-list", async (req, res) => {
  const { uid } = req.session;
  if (uid === undefined) {
    res.status(401).send("請先登入");
    return;
  }
  const status = await products.find({ uid });
  res.status(200).json(status);
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
