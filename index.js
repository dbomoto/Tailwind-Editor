const express = require('express')
const path = require('path')
const fs = require('fs')
const routes = require('./routes/routes.js')
const app = express()
const port = 3000

// for npm execution of scripts
const sys = require('sys')
const exec = require('child_process').exec

// public resources
app.use("/public", express.static(process.cwd() + '/public'));

// editor req for resources
app.use("/editor", express.static(process.cwd()+ '/node_modules/ace-builds/src-noconflict/'));

// parses JSON bodies
app.use(express.json());

// parses URL encoded bodies
app.use(express.urlencoded())

// modularized routes
routes(app,path,fs,exec);

// app listening
app.listen(port, () => {
  console.log(`Example app listening at ${port
  }`)
})