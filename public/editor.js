// editor behavior
const first = document.querySelector(".editor");
const liveView = document.querySelector(".liveView");
const btn = document.querySelector(".runCMD");

// editor settings and configurations
const editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");
editor.setFontSize(17);


// btn.addEventListener("click", () => {
//   var html = first.textContent;
//   liveView.innerHTML = html 
// });

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
    reloadCSS(); 
  } else {
    alert('Sum ting whent wong ohn da sirvir. UwU')
  }
})

first.addEventListener('keyup', () => {
  var html = editor.getValue();
  liveView.innerHTML = html 
})

first.addEventListener("paste", function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

function reloadCSS(){

  // remove old webpage.css
  var links = document.getElementsByTagName('LINK')
  links[2].remove()

  // request new webpage.css
  var head = document.getElementsByTagName('HEAD')[0]; 
  var link = document.createElement('link');
  link.rel = 'stylesheet'; 
  link.type = 'text/css';
  link.href = 'style.css'; 
  head.appendChild(link);   

}
