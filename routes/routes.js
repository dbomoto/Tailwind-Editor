
module.exports = function(app,path) {

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + '/views/editor.html'));
})

}

