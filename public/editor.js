// DOM calls.
const editor = document.querySelector("#editor");
const liveView = document.querySelector("#liveView");
const btn = document.querySelector("#runCMD");

// Editor and preview window settings and configurations.
const aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/twilight");
aceEditor.session.setMode("ace/mode/html");
aceEditor.setFontSize(17);
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

// Initial set up of iframe for page preview.
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
  <body></body>
  </html>
  `)

// Load initial event Listeners on window load.
window.onload = ()=>{
  // Generate button 
  btn.addEventListener('click', retrieveCSS)

  // Onkeyup while focus is on the Editor, automatically pass data to live view of webpage.
  editor.addEventListener('keyup', ()=>{
    liveView.contentDocument.body.innerHTML = aceEditor.getValue();
  })

}

// Retrieves the generated css from Tailwind
function retrieveCSS() {
  let data = liveView.contentWindow.document.getElementsByTagName("style")[0].innerHTML;
  console.log(data) // Show this data to client as output during Generate
}
  