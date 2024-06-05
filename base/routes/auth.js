const router = require('express').Router();

// #region cookie相关操作
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/set-cookie', (req, res) => {
  // res.cookie('name', 'zhangshuang') // 默认cookie有效期为浏览器会话结束
  res.cookie('name', 'zhangshuang', { maxAge: 1000 * 60, httpOnly: true }) // 设置cookie有效期为1分钟，并设置httpOnly属性
  res.cookie('age', 20)
  res.send('set cookie')
})

router.get('/remove-cookie', (req, res) => {
  res.clearCookie('name')
  res.send('remove cookie')
})

router.get('/get-cookie', (req, res) => {
  console.log(req.cookies)
  res.send('get cookie')
})
// #endregion


// #region session相关操作
const session = require('express-session');
const MongoStore = require('connect-mongo')
const Config = require('../config');

router.use(session({
  name: 'sid', // 设置cookie的名称, 默认值是connect.sid
  secret: 'node_base', // 参与加密的字符串(又称签名), 特殊名称: 加盐
  saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
  resave: true, // 是否每次都重新保存session，即使它没有被修改过
  store: MongoStore.create({
    mongoUrl: `mongodb://${Config.mongo.host}:${Config.mongo.port}/${Config.mongo.name}`, // 数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 js 操作
    maxAge: 1000 * 60 * 60 * 24 * 7 // 控制 sessionID 的过期时间
  }
}))

router.get('/login', (req, res) => {
  if (req.query.username === 'admin' && req.query.password === '123456') {
    req.session.username = "admin"
    res.send('login success')
  } else {
    res.send('login fail')
  }
})

router.get('/cart', (req, res) => {
  if (req.session.username) {
    res.send(`welcome ${req.session.username}, your cart is empty`)
  } else {
    res.send('you need login first')
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.send('logout success')
  })
})

module.exports = router;