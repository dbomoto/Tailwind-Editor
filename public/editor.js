// DOM calls.
const editor = document.querySelector("#editor");
const liveView = document.querySelector("#liveView");
const btn = document.querySelector("#runCMD");
const newTab = document.getElementById('newTab');
const howTo = document.querySelector('#howTo');
const swapBtn = document.querySelector('#swapBtn');

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
  reloadBtn.classList.add('cursor-wait','animate-pulse');
  newTab.classList.add('cursor-wait','animate-pulse');
  howTo.classList.add('cursor-wait','animate-pulse');
  editor.classList.add('cursor-wait','animate-pulse');
  swapBtn.classList.add('cursor-wait','animate-pulse');
  aceEditor.setOptions({readOnly:true})
  btn.disabled = true
  reloadBtn.disabled = true
  newTab.disabled = true
  howTo.disabled = true
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
  reloadBtn.classList.remove('cursor-wait','animate-pulse')
  newTab.classList.remove('cursor-wait','animate-pulse')
  howTo.classList.remove('cursor-wait','animate-pulse')
  editor.classList.remove('cursor-wait','animate-pulse');
  swapBtn.classList.remove('cursor-wait','animate-pulse');
  aceEditor.setOptions({readOnly:false})
  btn.disabled = false  
  reloadBtn.disabled = false  
  newTab.disabled = false  
  howTo.disabled = false  
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


// Reloads the iframe if scripts are added to the DOM.
let reloadBtn = document.querySelector('#reloadBtn')
function reloadLiveView(){
  btn.classList.add('cursor-wait','animate-pulse');
  reloadBtn.classList.add('cursor-wait','animate-pulse');
  newTab.classList.add('cursor-wait','animate-pulse');
  howTo.classList.add('cursor-wait','animate-pulse');
  editor.classList.add('cursor-wait','animate-pulse');
  aceEditor.setOptions({readOnly:true})
  btn.disabled = true
  reloadBtn.disabled = true
  newTab.disabled = true
  howTo.disabled = true
  
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
        window.parent.enableReload()
      }
    </script>
    </html>
    `)
}
function enableReload(){
  btn.classList.remove('cursor-wait','animate-pulse')
  reloadBtn.classList.remove('cursor-wait','animate-pulse')
  newTab.classList.remove('cursor-wait','animate-pulse')
  howTo.classList.remove('cursor-wait','animate-pulse')
  editor.classList.remove('cursor-wait','animate-pulse');
  aceEditor.setOptions({readOnly:false})
  btn.disabled = false  
  reloadBtn.disabled = false  
  newTab.disabled = false  
  howTo.disabled = false  
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


// Show editor or live view 

function swapView(){
  editor.classList.toggle('hidden');
  liveView.classList.toggle('hidden');
}

window.addEventListener('DOMContentLoaded', (event) => {
  aceEditor.setValue(`
    <div class="max-w-sm m-auto space-y-14 my-10 flex flex-col justify-start">

        <div class="text-center text-4xl font-mono flex flex-col font-bold tracking-wider">
            <span>Welcome</span>
            <span>to</span>
            <span>Tailwind Editor</span>
        </div>
        
        <div class="text-center space-y-2 tracking-wide">
            <h1 class="text-2xl font-mono font-semibold">What is Tailwind Editor</h1>
            <p class="font-sans">Tailwind Editor lets you code 
                HTML with TailwindCSS autocomplete and immediately see the results
                on the Live View section. This welcome page, is an example of using this editor.
                The code for this is avaialbe on the editor for your reference. A prerequisite to using
                this app is the familiarity in using TailwindCSS. If you wish to learn how TailwindCSS 
                works, please visit them on their <a href="https://tailwindcss.com/" target="_blank"
                class="underline text-blue-500 underline-offset-4 cursor-pointer">website</a>
            </p>
        </div>
        
        <div class="text-center space-y-4 tracking-wide">
            <h1 class="text-2xl font-mono font-semibold">How to use</h1>
            <h2 class="text-xl font-mono font-medium">Input and Output</h2>
            <p>There are two sections to Tailwind Editor. The left side is the editor
                and the right side is the Live View. You can treat the editor as the 
                body itself to an HTML page. If you are viewing this on a mobile screen,
                there is a <span class="text-yellow-700 font-semibold italic underline
                underline-offset-4">EDITOR/LIVE VIEW</span> button available, to switch between
                them.
            </p>
            <h2 class="text-xl font-mono font-medium">Generate the CSS code</h2>
            <p>CSS equivalent code for Tailwind is availbe for use when you click the
                <span class="text-yellow-700 font-semibold italic underline
                underline-offset-4">GENERATE</span> button on the command bar. After waiting for about
                5 seconds, a modal or dialog box will pop up with the CSS code, ready
                to be copied to the clipboard.
            </p>
            <h2 class="text-xl font-mono font-medium">Customizing the Ace Editor</h2>
            <p>Transfer the focus to the editor by clicking on it. Then press <span class="text-yellow-700 font-semibold italic underline
            underline-offset-4">F1</span> for command prompt
            to appear. This shows all the commands available for the Ace Editor and its shortcut keys.
            While still having the focus on the editor, you can press <span class="text-yellow-700 font-semibold italic underline
            underline-offset-4">Ctrl+&#60</span> to show the settings for Ace Editor. Here you can 
            edit things like font size or wrapping of code on the editor, just to name a few.
            </p>    
        </div>
        
        <div class="text-center space-y-2 tracking-wide">
            <h1 class="text-2xl font-mono font-semibold">Features</h1>
            <h2 class="text-xl font-mono font-medium">Tailwind Autocomplete</h2>
            <p>Tailwind Editor has autocomplete for all TailwindCSS utility classes.
            Everthing from states, media queiries, and even arbitrary values are available
            for use.</p>
            <h2 class="text-xl font-mono font-medium">Open in New Tab</h2>
            <p>If you need to use the developer tools for your browser or your developer extensions, it's best
                to open the webpage on a new tab instead of using the Live View. Just click
                the <span class="text-yellow-700 font-semibold italic underline
                underline-offset-4">VIEW IN NEW TAB</span> button and your page will be passed on to
                that new tab.
            </p>
            <h2 class="text-xl font-mono font-medium">CSS Code Generation</h2>
            <p>CSS code equivalent for Tailwind is available on demand in case you dont want to add 
                Tailwind to your website and make it a bit faster by having fewer requests sent to
                the server.
            </p>
            <h2 class="text-xl font-mono font-medium">Editor Customization</h2>
            <p>Ace Editor has a lot of customizations available at our disposal.
                Ready made Keybindings, font size, wrap, folding, etc. If you
                want to know how, please refer to the "HOW TO USE" section.
            </p>
            <h2 class="text-xl font-mono font-medium">Responsive</h2>
            <p>Tailwind Editor is responsive. That means whether you are using this on the 
                phone or your desktop PC, it can easily adjust itself to fit your screen.
            </p>
        </div>

        <div class="text-center space-y-2 tracking-wide">
            <h1 class="text-2xl font-mono font-semibold">Author Notes</h1>
            <p>Sometimes, the Live View won't work immediately escpecially
                if a lot of code is written at one time. Because of this, 
                a <span class="text-yellow-700 font-semibold italic underline
                underline-offset-4">RELOAD</span>button is available for your use to manually
                reload the the page and see the changes.
            </p>
        </div>

    </div>  
  `);
  reloadLiveView();
});
