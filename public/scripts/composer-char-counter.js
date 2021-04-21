const textareaEl = $('#tweet-text');

const charCounter = function () {
  const outputEl = $(this).parent().children().children()[1];
  outputEl.innerText = 140 - this.value.length;
  outputEl.innerText < 0 ? $(outputEl).css('color', '#ff0000') : $(outputEl).css('color', '#545149');
};

$(document).ready(function () {
  textareaEl.on('keyup', charCounter);
});
















// My version:

// $(document).ready(function () {
//   const textareaEl = $('#tweet-text');

//   const charCounter = function () {
//     const outputEl = $('#output');
//     outputEl[0].defaultValue = 140;
//     outputEl[0].defaultValue = 140 - this.value.length;
//     outputEl[0].defaultValue < 0 ? outputEl.css('color', '#ff0000') : outputEl.css('color', '#545149');
//   };

//   textareaEl.on('keyup', charCounter);
// });
