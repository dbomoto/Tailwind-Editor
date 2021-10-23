const express = require('express')
const path = require('path')
const routes = require('./routes/routes.js')
const app = express()
const port = 3000

app.use("/public", express.static(process.cwd() + '/public'));

routes(app,path);

app.listen(port, () => {
  console.log(`Example app listening at ${port
  }`)
})