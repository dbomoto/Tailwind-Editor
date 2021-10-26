// editor behavior
const first = document.querySelector(".editor");
const liveView = document.querySelector(".liveView");
const btn = document.querySelector(".runCMD");

// editor settings and configurations
const editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");
editor.setFontSize(17)


btn.addEventListener("click", () => {
  var html = first.textContent;
  liveView.innerHTML = html 
});


first.addEventListener('keyup', () => {
  var html = editor.getValue();
  liveView.innerHTML = html 
})

first.addEventListener("paste", function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

