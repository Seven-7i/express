const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`)

mongoose.connection.once('open', () => {
  console.log('success connect to mongodb')
})

mongoose.connection.on('error', (err) => {
  console.log('mongodb connect error', err)
})

mongoose.connection.on('close', () => {
  console.log('mongodb connect close')
})