const jwt = require('jsonwebtoken')

// const token = jwt.sign({name: 'John Doe'}, 'express-base-secret', {
//   expiresIn: 600
// })

// console.log(token)

let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3MTY4MTg5MzEsImV4cCI6MTcxNjgxOTUzMX0.yYqbGyo2S5adcs3reqQG3pz0m7pmPvloE_1of5naDEY'

jwt.verify(t, 'express-base-secret', (err, decoded) => {
  if (err) {
    console.log('解码失败')
  }
  console.log(decoded)
})