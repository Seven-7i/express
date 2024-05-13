const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 用于解析 x-www-form-urlencoded 格式的请求体数据
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//  用于解析 application/json 格式的请求体数据，也就是 JSON 格式的数据。
const jsonParser = bodyParser.json();

app.get('/home', (req, res) => {
  res.send('前台首页')
})

app.get('/ip', urlencodedParser, (req, res) => {
  console.log(req.headers)
  console.log(req.query, req.params, req.body)
  res.end('获取客户端IP地址成功')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})