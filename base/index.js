const express = require('express');
const router = require('./routes/index');
const config = require('./config')
require('./db')

const app = express();

app.use(router)

app.listen(config.port, () => {
  console.clear();
  console.log(`Server running on port ${config.port}`);
})