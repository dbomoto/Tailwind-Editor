// DOM calls.
const editor = document.querySelector("#editor");
const liveView = document.querySelector("#liveView");
const btn = document.querySelector("#runCMD");
const newTab = document.getElementById('newTab');

// Observer for resize of the editor
const editorResize = new ResizeObserver(el=>{
  aceEditor.setOptions({wrap:false})
  aceEditor.setOptions({wrap:true}) 
})
editorResize.observe(editor);


// Editor settings and configurations.
ace.require("ace/ext/language_tools");
const aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/twilight");
aceEditor.session.setMode("ace/mode/html");
aceEditor.setFontSize(17);
aceEditor.setOptions({
  enableBasicAutocompletion: [{
    getCompletions: (editor, session, pos, prefix, callback) => {
  // Note, won't fire if caret is at a word that does not have these letters
  // console.log(editor,session,pos,prefix)
      callback(null, tailwindCompletions);
    },
  }],
  // To make popup appear automatically, without explicit _ctrl+space_.
  enableLiveAutocompletion: true,
});


// Editor for Modal
const genCSS = ace.edit("genCSS");
genCSS.setTheme("ace/theme/twilight");
genCSS.session.setMode("ace/mode/css");
genCSS.setFontSize(17);
genCSS.setOptions({wrap:true})



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

  // Open in New Tab button
  newTab.addEventListener('click', openNewTab)

  // Onkeyup while focus is on the Editor, automatically pass data to live view of webpage.
  editor.addEventListener('keyup', ()=>{
    liveView.contentDocument.body.innerHTML = aceEditor.getValue();
  })

  // editor.addEventListener('re')

}


// Retrieves the generated css from Tailwind and display to user.
let modalGenerate = document.querySelector('.modal-generate')
let genCSSElement = document.querySelector('#genCSS')
function retrieveCSS() {
  btn.classList.add('cursor-wait','animate-pulse');
  editor.classList.add('cursor-wait','animate-pulse');
  aceEditor.setOptions({readOnly:true})
  btn.disabled = true
  // Removes unused arbitrary values from Tailwind.
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
    <body>${aceEditor.getValue()}</body>
    <script>
    window.onload = () => {
      setTimeout(()=>{window.parent.passCSS()},5000)
    }
    </script>
    </html>
    `)

}
function passCSS(){
  let data = liveView.contentWindow.document.getElementsByTagName("style")[0].innerHTML.replace('/* ! tailwindcss v3.0.18 | MIT License | https://tailwindcss.com */',"");
  genCSS.session.setValue(vkbeautify.css(data,4))
  modalGenerate.click()

  btn.classList.remove('cursor-wait','animate-pulse')
  editor.classList.remove('cursor-wait','animate-pulse');
  aceEditor.setOptions({readOnly:false})
  btn.disabled = false
}

  
//Opens the page in a new tab. 
function openNewTab() {
 window.open().document.write(`  
 <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Talwind Editor</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>${aceEditor.getValue()}</body>
  </html> `) 
}


// Copy CSS to clipboard
let copyNotifier = document.querySelector('#copy-notifier')
function copyCSS() {

  let css = genCSS.session.getValue();
  navigator.clipboard.writeText(css);
  copyNotifier.classList.toggle('hidden')
  setTimeout(()=>{copyNotifier.classList.toggle('hidden')
  }, 2000);
}



// AUTO ADJUST OF AUTOCOMPLETE WINDOW 




// gets the current line where the cursor blinks
// var currline = editor.getSelectionRange().start.row;
// gets the code written on that line.
// var wholelinetxt = editor.session.getLine(currline);
// retrieves cursor position
// aceEditor.getCursorPosition()


// Change the width of these elements to adjust the autocomplete box
//  ace_editor ace_autocomplete ace_dark ace-twilight
// ace_scroller > ace_content

// automcomplete suggustions is contained here
// ace_layer ace_text-layer


// Hypo
// find the longest test currently used by the autompleter and set that as the longest Value

// index 10-18 is where the autocomplete suggustions is placed 
// retrieve the displayed automcomplete and store in an arraay
var autocompleteArray = [];
var longestValue = '';
$('body').append("<span id='longText' class='hidden'></span>");
var longElement = $('body').find("#longText");


document.addEventListener('keydown',()=>{
  var el = '';
  for (let x=10; x<=18; x++){
    let temp = 
    $('.ace_layer,.ace_text-layer > .ace_line')[x].children[0].innerText +
    $('.ace_layer,.ace_text-layer > .ace_line')[x].children[1].innerText + 
    $('.ace_layer,.ace_text-layer > .ace_line')[x].children[2].innerText;
    if (autocompleteArray.length > 9){
      autocompleteArray.shift()
      autocompleteArray.push(temp)
    } else {
      autocompleteArray.push(temp)
    }
  }

  for(let temp of autocompleteArray){
    if (temp.length >= longestValue.length){
      longestValue = temp
    }
  }

  longElement.text(longestValue); //longestValue containts the Long String
  var longeElementWidth = longElement.width();
  var autoCompleterWidth = $(".ace_autocomplete").width();

      // var newAutoCompleteWidth = (longElement[0].innerText.length*4) + "px";

      // $(".ace_editor.ace_autocomplete").width(longeElementWidth);  

  if (longeElementWidth >= autoCompleterWidth) {
      var newAutoCompleteWidth = longeElementWidth + 20 + "px";

      $(".ace_editor.ace_autocomplete").width(newAutoCompleteWidth);
  } else {
      //Defaulting the width of the autocompleter to 350px
      $(".ace_editor.ace_autocomplete").width("350px");
  }     
})





