$('document').ready(function() {
  const textareaEl = $('#tweet-text');

  const charCounter = function () {
    const outputEl = this.parentElement.querySelector('output');
    outputEl.innerText = 140 - this.value.length;
    // outputEl.innerText < 0 ? $(outputEl).css('color', '#ff0000') : $(outputEl).css('color', '#545149');
    // outputEl.innerText < 0 ? outputEl.classList.add('negNumColor') : outputEl.classList.remove('negNumColor')
    outputEl.innerText < 0 ? $(outputEl).addClass('negNumColor') : $(outputEl).removeClass('negNumColor');
  };
  
  textareaEl.on('keyup', charCounter);
});