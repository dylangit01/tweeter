$(document).ready(function () {
	const textareaEl = $('#tweet-text');
	const outputEl = $('.counter')
	outputEl[0].defaultValue = +140;

	const charCounter = function(e) {
				console.log(this.value.length);
		    let inputWordsLength = e.target.value.length;
        outputEl[0].defaultValue = 140 - inputWordsLength;
        outputEl[0].defaultValue < 0 ? outputEl.css('color', '#ff0000') : outputEl.css('color', '#545149');
	}
	
	textareaEl.on('keyup', charCounter);
	














  // end
});
