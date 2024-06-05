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

  // 8. 查询多条数据
  // $gt(>), $lt(<), $gte(>=), $lte(<=), $ne(!==), $in, $nin, $all, $regex, $options
  // result = await BookModel.find({ price: { $lt: 2 } })

  // $or, $and
  // result = await BookModel.find({ $or: [{ author: '吴承恩' }, { author: '鲁迅' }] })

  // 正则表达式查询
  // result = await BookModel.find({ name: /楼/ })
  result = await BookModel.find({ name: new RegExp('楼') })

  console.log(result)
})

mongoose.connection.on('error', (err) => {
  console.log('mongodb connect error', err)
})

mongoose.connection.on('close', () => {
  console.log('mongodb connect close')
})