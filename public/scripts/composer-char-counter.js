$(document).ready(function () {
	const textareaEl = $('#tweet-text');
	const outputEl = $('.counter')
	outputEl[0].defaultValue = +140;
	
	textareaEl.on('keyup', function (e) {
    let inputWordsLength = e.target.value.length;
    outputEl[0].defaultValue = 140 - inputWordsLength;
		outputEl[0].defaultValue < 0 ? outputEl.css('color', '#ff0000') : outputEl.css('color', '#545149');
  });
	














  // end
});
