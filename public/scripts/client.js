/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  
  const renderTweets = function (tweets) {
    tweets.reverse().forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

  const createTweetElement = function (data) {
    const { user: { name, avatars, handle }, content: { text }, created_at, } = data;
    const safeHtml = $('<div>').text(`${text}`).text()
    // console.log(safeHtml);
    return $(`
		<article class='tweet'>
			<header>
				<div class="faceName">
					<span><img src="${avatars}" alt="userAvatar"/></i>${name}</span>
					<span>${handle}</span>
				</div>
				<p>${safeHtml}</p>
			</header>
			<footer>
				<span class="timePassed">${timeago.format(new Date(created_at))}</span>
				<span>
					<i class="fas fa-flag fa-xs"></i>
					<i class="fas fa-retweet fa-xs"></i>
					<i class="fas fa-heart fa-xs"></i>
				</span>
			</footer>
		</article>
	`);
  };

  const loadTweets = () => {
    $.ajax({ url: '/tweets' }).then((data) => {
      renderTweets(data);
    });
  };

  loadTweets();

  // Below fn cannot use "this", otherwise use tradition function syntax.
  $('.new-tweet form').submit((event) => {
    console.log('Handler for .submit() called.');
    event.preventDefault();
    let tweetInput = $('#tweet-text').val();
    let maxInputChar = $('form output').text()
    // console.log($('form output').text());
    if (tweetInput === '' || tweetInput === null) {
      alert('Tweet content cannot be empty, please try again')
      return;
    } else if (maxInputChar < 0) {
      alert('Tweet content should be less then 140 characters');
      return;
    }
    // console.log($(event.target).serialize());
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(event.target).serialize(),
    }).then(() => {
      // console.log('Successfully loaded');
      // $('#tweet-text').val('')
      // $('form output').text('140')
      location.reload();
      // $('#tweets-container').empty()
      // loadTweets()
    });
  });






  
});
