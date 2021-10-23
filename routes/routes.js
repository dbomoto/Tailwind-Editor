app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/editor.html'));
})

module.exports = 