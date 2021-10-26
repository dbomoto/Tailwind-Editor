const express = require('express')
const path = require('path')
const routes = require('./routes/routes.js')
const app = express()
const port = 3000

app.use("/public", express.static(process.cwd() + '/public'));

app.use("/editor", express.static(process.cwd()+ '/node_modules/ace-builds/src-noconflict/'));

routes(app,path);

app.listen(port, () => {
  console.log(`Example app listening at ${port
  }`)
})