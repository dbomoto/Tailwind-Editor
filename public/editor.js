// editor behavior
const first = document.querySelector(".editor");
const liveView = document.querySelector(".liveView");
const btn = document.querySelector(".runCMD");

// editor settings and configurations
const editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");
editor.setFontSize(17);

// event listeners on the editor
btn.addEventListener('click',async ()=>{
  let data = editor.getValue();
  let response = await fetch('/tailwind',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },    
    body: JSON.stringify({'webpage':editor.getValue()})
    })
  let status = await response.json()
  if (status.tailwind === 'updated'){
    document.getElementById('customCSS').innerHTML = decodeURI(status.css);
  } else {
    alert('Sum ting whent wong ohn da sirvir. UwU')
  }
})

first.addEventListener('keyup', () => {
  var htmlValue = editor.getValue();
  liveView.innerHTML = htmlValue 
})

first.addEventListener("paste", function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});




