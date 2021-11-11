// editor behavior
const editor = document.querySelector(".editor");
const liveView = document.querySelector(".liveView");
const btn = document.querySelector("#runCMD");
const loader = document.querySelector('#loader');
const mainEditor = document.querySelector('.main-editor');
const autoCompile = document.querySelector('#autoCompile');

// global variables
var loaderTimer;
var autoCompileBtn = true;

// editor settings and configurations
const aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/twilight");
aceEditor.session.setMode("ace/mode/html");
aceEditor.setFontSize(17);

// RUN button
btn.addEventListener('click', jitTailwind)

// onkeyup event on the editor
editor.addEventListener('keyup', ()=>{
  liveView.innerHTML = aceEditor.getValue() 
})

// auto complie on keyup and after a set period
editor.addEventListener('keyup', keyupListener)

// paste event on the editor
editor.addEventListener("paste", function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
  jitTailwind();
});

// user preference of auto compile or manual
autoCompile.addEventListener('click', () => {
  if (autoCompileBtn){
  editor.removeEventListener('keyup', keyupListener);
  autoCompile.innerText = 'Compile OFF'
  autoCompileBtn = false;
  } else {
  editor.addEventListener('keyup', keyupListener);
  autoCompile.innerText = 'Compile AUTO'
  autoCompileBtn = true;   
  }
})

// request function for compiled custom css
async function jitTailwind(){
  editor.removeEventListener('keyup', keyupListener)
  loader.classList.toggle('hidden');
  let response = await fetch('/tailwind',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },    
    body: JSON.stringify({'webpage':aceEditor.getValue()})
    })
  let status = await response.json()
  if (status.tailwind === 'updated'){
    document.getElementById('customCSS').innerHTML = decodeURI(status.css);
  } else {
    alert('Sum ting whent wong ohn da sirvir. Pwease welowd de eyjitur. UwU')
  }
  liveView.innerHTML = aceEditor.getValue();
  editor.addEventListener('keyup', keyupListener)
  loader.classList.toggle('hidden')
}

// Timer function for keyup event listener
function keyupListener(){  
  clearTimeout(loaderTimer);
  loaderTimer = setTimeout(jitTailwind, 5000);
}
