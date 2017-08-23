then(toCall, callback) {
	try {
		callback(toCall())
	} catch (e) {
		throw "DisplayJS: " + e;
	}
}
copy(text) {
  // IE specific
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text);
  }

  // all other modern
  target = document.createElement("textarea");
  target.style.position = "absolute";
  target.style.left = "-9999px";
  target.style.top = "0";
  target.textContent = text;
  document.body.appendChild(target);
  target.focus();
  target.setSelectionRange(0, target.value.length);

  // copy the selection of fall back to prompt
  try {
    document.execCommand("copy");
    target.remove();
  } catch(e) {
    console.log("DisplayJS: Can't copy string on this browser.")
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }
}
