const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`)

mongoose.connection.once('open', async () => {
  // 1. 创建文档结构对象
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    createdAt: Date
  })
  // 2. 创建模型对象
  let BookModel = mongoose.model('books', BookSchema)

  // 3. 新增数据
  const result = await BookModel.create({
    name: '西游戏',
    author: '吴承恩',
    price: 19.9,
    is_hot: true,
    tags: ['游戏', '科幻', '西游'],
    createdAt: new Date()
  })
  console.log(result)
})

mongoose.connection.on('error', (err) => {
  console.log('mongodb connect error', err)
})

mongoose.connection.on('close', () => {
  console.log('mongodb connect close')
})