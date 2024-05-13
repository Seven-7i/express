const express = require('express');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

const app = express();
const port = 3000;

// 声明全局中间件函数
function recordMiddleware(req, res, next) {
  let {url, ip} = req;
  fs.appendFileSync(path.resolve(__dirname, 'access.log'), `${dayjs().format('YYYY-MM-DD HH:mm:ss')} ${url} ${ip}\n`)
  next()
}

app.use(recordMiddleware)

// 设置静态资源中间件设置, 注：与路由谁先匹配上，就先返回谁
app.use(express.static(__dirname + '/public'))

app.get('/home', (req, res) => {
  res.send('前台首页')
})

app.get('/ip', (req, res, next) => {
  next()
  console.log('第一次执行')
}, (req, res, next) => {
  console.log('中间件执行完毕')
  res.end('获取客户端IP地址成功')
  next()
  console.log('第二次执行')
}, () => {
  console.log('最后执行')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  if (fs.existsSync('access.log')) fs.rm('access.log', (a, b, c) => {
    console.log('删除成功', a, b, c)
  })
})