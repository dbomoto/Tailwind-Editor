
module.exports = function(app,path,fs,exec) {


app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + '/views/editor.html'));
})

app.post('/tailwind',(req,res)=>{
  // overwrites webpage.txt
  fs.writeFile(path.join(process.cwd() + '/pages/webpage.txt'),req.body.webpage,(err)=>{
    if (err) throw err;
    console.log('REPLACED')  
  })

  // build new tailwind css
  exec('npm run webpage', (error,stdout,stderr)=>{
    console.log('EXECUTED')
  })

  //inform client of new css
  res.json({tailwind:'updated'}) 
})





}

