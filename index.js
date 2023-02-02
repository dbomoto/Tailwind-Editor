const express = require('express')
const path = require('path')
const routes = require('./routes/routes.js')
const app = express()
const port = 3000

// public resources
app.use("/public", express.static(process.cwd() + '/public'));

// editor req for resources
app.use("/editor", express.static(process.cwd() + '/node_modules/ace-builds/src-noconflict/'));

// modularized routes
routes(app, path);

// app listening
app.listen(port, () => {
  console.log(`App is listening at ${port
    }`)
})