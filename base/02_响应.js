const express = require('express');
const app = express();
const port = 3000;

app.get('/response', (req, res) => {
  // 1.普通响应
  res.status(300).setHeader('custom-header', 'play').end('This is a custom response, 不可能乱码')
  // 2.跳转响应
  // res.redirect('https://www.baidu.com')
  // 3.文件响应
  // res.sendFile(__dirname + '/package.json')
  // 4.下载响应
  // res.download(__dirname + '/package.json', 'packageAAA.json')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})