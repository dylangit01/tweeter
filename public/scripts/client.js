/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  
  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

  const createTweetElement = function (data) {
    const { user: { name, avatars, handle }, content: { text }, created_at, } = data;
    return $(`
		<article class='tweet'>
			<header>
				<div class="faceName">
					<span><img src="${avatars}" alt="userAvatar"/></i>${name}</span>
					<span>${handle}</span>
				</div>
				<p>${text}</p>
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

  // renderTweets(data);

  // Below fn cannot use "this", otherwise use tradition function syntax.
  $('.new-tweet form').submit((event) => {
    console.log('Handler for .submit() called.');
    event.preventDefault();
    console.log($(event.target).serialize());
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(event.target).serialize(),
    }).then(() => {
      console.log('Successfully loaded');
    });
  });

  const loadTweets = () => {
    $.ajax({ url: '/tweets' }).then(data => {
      renderTweets(data)
    })
  }

  loadTweets()




  
});
