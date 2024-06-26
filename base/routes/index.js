const router = require("express").Router();

const adminRouter = require("./admin");
const homeRouter = require("./home");
const fileRouter = require("./file");
const userRouter = require("./user")
const authRouter = require("./auth")

module.exports = router.use(adminRouter).use(homeRouter).use(fileRouter).use(userRouter).use(authRouter).use((req, res) => {
  res.status(404).send("未找到页面");
});
