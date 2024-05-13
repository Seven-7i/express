const express = require('express');
const router = require('./routes/index');

const app = express();
const port = 3000;

app.use(router)

app.listen(port, () => {
  console.clear();
  console.log(`Server running on port ${port}`);
})