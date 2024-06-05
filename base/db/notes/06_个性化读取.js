const config = require('../config');
const mongoose = require('mongoose');
const { callAsync } = require('../utils/general')

mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`)

mongoose.connection.once('open', async () => {
  let result = null
  let error = null

  // 1. 创建文档结构对象
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      default: '吴承恩'
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L', 'XL', 'XXL']
    },
    price: Number,
    is_hot: Boolean,
    tags: Array,
    createdAt: Date
  })

  // 2. 创建模型对象
  let BookModel = mongoose.model('books', BookSchema)

  // 3. 字段筛选
  // result = await BookModel.find({}).select({ name: 1, author: 1, _id: 0 })

  // 3. 排序
  // result = await BookModel.find({}).sort({ price: -1 })

  // 4. 数据截取
  result = await BookModel.find({}).skip(1).limit(2)
  console.log(result)
})

mongoose.connection.on('error', (err) => {
  console.log('mongodb connect error', err)
})

mongoose.connection.on('close', () => {
  console.log('mongodb connect close')
})