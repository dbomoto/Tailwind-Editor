// DOM calls.
const editor = document.querySelector("#editor");
const liveView = document.querySelector("#liveView");
const btn = document.querySelector("#runCMD");
const loader = document.querySelector('#loader');
const mainEditor = document.querySelector('#main-editor');
const autoCompile = document.querySelector('#autoCompile');
  // Retrieve tailwind from stylesheet and initially load it on the iframe.
const tailwindCSS = [document.styleSheets[0]] 
  .map(styleSheet => {
    try {
      return [...styleSheet.cssRules]
        .map(rule => rule.cssText)
        .join('');
    } catch (e) {
      console.log('Access to stylesheet %s is denied. Ignoring...', styleSheet.href);
    }
  })
  .filter(Boolean)
  .join('\n');

// Global variables.
var loaderTimer;
var autoCompileBtn = true;

// Editor and preview window settings and configurations.
const aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/twilight");
aceEditor.session.setMode("ace/mode/html");
aceEditor.setFontSize(17);

// test
// aceEditor.getSession().setUseWrapMode(true);
// aceEditor.resize(true);

aceEditor.setOptions({
  enableBasicAutocompletion: [{
    getCompletions: (editor, session, pos, prefix, callback) => {
  // Note, won't fire if caret is at a word that does not have these letters
      callback(null, tailwindCompletions);
    },
  }],
  // To make popup appear automatically, without explicit _ctrl+space_.
  enableLiveAutocompletion: true,
});
  // Initial setting of iframe for page preview.
liveView.setAttribute('srcdoc', `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Talwind Editor</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <style>
  ${tailwindCSS}
  </style>
  <style id="customCSS">
  </style>
  <body>

  </body>
  </html>
  `)

// Load initial event Listeners on window load.
window.onload = ()=>{
  // RUN button
  btn.addEventListener('click', jitTailwind)

  // Onkeyup event on the editor.
  editor.addEventListener('keyup', ()=>{
    liveView.contentDocument.body.innerHTML = aceEditor.getValue();
  })

  // Auto compile on keyup and after a set period.
  editor.addEventListener('keyup', keyupListener)

  // ** DO I STILL NEED THIS ?????
  // Paste event on the editor.
  // editor.addEventListener("paste", function(e) {
  //   e.preventDefault();
  //   var text = e.clipboardData.getData("text/plain");
  //   // document.execCommand("insertText", false, text);
  //   // editor.execCommand('paste',text)
  //   // liveView.contentDocument.body.innerHTML = text
  //   editor.insert(text)
  // });
}

// User preference of auto compile or manual
autoCompile.addEventListener('click', () => {
  if (autoCompileBtn){
  editor.removeEventListener('keyup', keyupListener);
  clearTimeout(loaderTimer);
  autoCompile.innerHTML = 'Compile<br><span class="buttonStatus">OFF</span>'
  autoCompileBtn = false;
  } else {
  editor.addEventListener('keyup', keyupListener);
  autoCompile.innerHTML = 'Compile<br><span class="buttonStatus">AUTO</span>'
  autoCompileBtn = true;   
  }
})

// Request function for compiled custom css.
async function jitTailwind(){
  editor.removeEventListener('keyup', keyupListener)
  btn.disabled = true;
  autoCompile.disabled = true;
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
    // Apply custom css to preview page
    liveView.contentWindow.document.getElementById('customCSS').innerHTML = decodeURI(status.css);
  } else {
    alert('Sum ting whent wong ohn da sirvir. Pwease welowd de eyjitur. UwU')
  }
  liveView.innerHTML = aceEditor.getValue();
  if(autoCompileBtn){
    editor.addEventListener('keyup', keyupListener)
  }
  btn.disabled = false;
  autoCompile.disabled = false;  
  loader.classList.toggle('hidden')
}

// Timer function for keyup event listener.
function keyupListener(){  
  clearTimeout(loaderTimer);
  loaderTimer = setTimeout(jitTailwind, 5000);
}

  