const router = require("express").Router();

const adminRouter = require("./admin");
const homeRouter = require("./home");
const fileRouter = require("./file");
const userRouter = require("./user")

module.exports = router.use(adminRouter).use(homeRouter).use(fileRouter).use(userRouter).use((req, res) => {
  res.status(404).send("未找到页面");
});
