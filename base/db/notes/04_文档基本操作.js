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

  // 3. 新增数据
  // result = await BookModel.create({
  //   name: '西游记',
  //   author: '吴承恩',
  //   size: 'M',
  //   price: 19.9,
  //   is_hot: false,
  //   tags: ['游戏', '科幻', '西游'],
  //   createdAt: new Date()
  // })
  // console.log(result)

  // 4. 删除数据
  // result = await BookModel.deleteOne({ _id: '664b4d83677198fbfa86764b' })
  // console.log(result)

  // 5. 批量删除
  // result = await BookModel.deleteMany({ is_hot: true })
  // console.log(result)

  // 6. 更新数据
  // result = await BookModel.updateOne({ _id: '664b54f848e5253bcbfc6d93' }, { price: 29.9 })
  // console.log(result)

  // 7. 查询数据
  // result = await BookModel.findOne({ name: '西游记12' })
  // console.log(result)

  // 8. 查询多条数据
  result = await BookModel.find({ author: '吴承恩' })
  console.log(result)
})

mongoose.connection.on('error', (err) => {
  console.log('mongodb connect error', err)
})

mongoose.connection.on('close', () => {
  console.log('mongodb connect close')
})