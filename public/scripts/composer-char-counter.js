$('document').ready(function () {
  const textareaEl = $('#tweet-text');

  const charCounter = function () {
    const outputEl = this.parentElement.querySelector('output');
    outputEl.innerText = 140 - this.value.length;
    outputEl.innerText < 0 ? $(outputEl).css('color', '#ff0000') : $(outputEl).css('color', '#545149');
  };

  textareaEl.on('keyup', charCounter);
});
