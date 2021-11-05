// editor behavior
const editor = document.querySelector(".editor");
const liveView = document.querySelector(".liveView");
const btn = document.querySelector("#runCMD");
const loader = document.querySelector('#loader');
const mainEditor = document.querySelector('.main-editor')

// editor settings and configurations
const aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/twilight");
aceEditor.session.setMode("ace/mode/html");
aceEditor.setFontSize(17);

// RUN button
btn.addEventListener('click', jitTailwind)

// onkeyup event on the editor
editor.addEventListener('keyup', () => {  
  liveView.innerHTML = aceEditor.getValue() 
  // auto compile in 10s
  setTimeout(jitTailwind,5000);
})

// paste event on the editor
editor.addEventListener("paste", function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
  jitTailwind();
});

// request for compiled custom css
async function jitTailwind(){
  loader.classList.toggle('hidden')
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
  loader.classList.toggle('hidden')
}


