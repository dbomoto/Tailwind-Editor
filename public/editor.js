const first = document.querySelector(".editor");
const liveView = document.querySelector(".liveView");
const btn = document.querySelector(".runCMD");

btn.addEventListener("click", () => {
  var html = first.textContent;
  liveView.innerHTML = html 
});


first.addEventListener('keyup', () => {
  var html = first.textContent;
  liveView.innerHTML = html 
})

first.addEventListener("paste", function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});