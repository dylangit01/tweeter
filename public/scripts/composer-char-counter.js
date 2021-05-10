$(document).ready(function() {
  const textareaEl = $('#tweet-text');

  const charCounter = function () {
    const $testEl = $(this).closest('form');    //closest is used to find the parent element of this event
    const $formEl = $(this).parent();
    // console.log($formEl);

    // const $outputEl = $(this).next().find('output');
    const $outputEl = $(this).parent().find('output')
    $outputEl.text(140 - this.value.length)
    $outputEl.text() < 0 ? $outputEl.addClass('negNumColor') : $outputEl.removeClass('negNumColor');

    // const outputEl = this.parentElement.querySelector('output');
    // outputEl.innerText = 140 - this.value.length;
    // outputEl.innerText < 0 ? $(outputEl).css('color', '#ff0000') : $(outputEl).css('color', '#545149');          //inline css
    // outputEl.innerText < 0 ? outputEl.classList.add('negNumColor') : outputEl.classList.remove('negNumColor')    //DOM add/remove css
  };
  
  textareaEl.on('keyup', charCounter);
});