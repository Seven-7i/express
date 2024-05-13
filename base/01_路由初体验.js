const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.end('Hello World!')
})

app.get('/home', (req, res) => {
  res.end('Welcome to my home page')
})

app.get('/ip', (req, res) => {
  res.end(req.ip)
})

// res.end  通常用来返回纯文本内容或二进制数据
app.get('/singer/:id', (req, res) => {
  const {id} = req.params;
  const singer = {
    id,
    name: 'Jay'+ id,
    age: Number(id) + 20,
  }
  res.json(singer)
  // res.end(singer)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})