$(document).ready(function() {
	const textareaEl = $('#tweet-text');
	
  const charCounter = function () {
		const outputEl = $(this).parent().children().children()[1]
		let inputWordsLength = this.value.length;
		outputEl.innerText = 140 - inputWordsLength;
    outputEl.innerText < 0 ? outputEl.style.color = '#ff0000' : outputEl.style.color = '#545149';
  };

  textareaEl.on('keyup', charCounter);

  // end
});















// My version:

// $(document).ready(function () {
//   const textareaEl = $('#tweet-text');

//   const charCounter = function () {
//     const outputEl = $('#output');
//     outputEl[0].defaultValue = +140;
//     let inputWordsLength = this.value.length;
//     outputEl[0].defaultValue = 140 - inputWordsLength;
//     outputEl[0].defaultValue < 0 ? outputEl.css('color', '#ff0000') : outputEl.css('color', '#545149');
//   };

//   textareaEl.on('keyup', charCounter);

//   // end
// });