
module.exports = function(app,path,fs,exec) {


app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + '/views/editor.html'));
})

app.post('/tailwind',async (req,res)=>{
  // overwrites webpage.txt
  await fs.writeFile(
    path.join(process.cwd() + '/pages/webpage.txt'), 
    req.body.webpage,
    (err)=>{
      if (err) throw err;
      console.log('Replaced /pages/webpage.txt')  
    }
  )

  // build new tailwind css
  // cannot "await" child process of exec
  exec('npm run webpage', (error,stdout,stderr)=>{
    console.log('Compiles new /public/webpage.css')

    // read new css and send to client
    fs.readFile(
      path.join(process.cwd() + '/public/webpage.css'),
      (err,data)=>{
        if (err) console.log(err);
        let cssString =data.toString('utf-8');
        res.json({
          tailwind:'updated',
          css: encodeURI(cssString)}) 
      }
    )
  })
})





}

