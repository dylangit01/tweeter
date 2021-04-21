/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

$('document').ready(function () {
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

  renderTweets(data);

  // Below fn cannot use "this", otherwise use tradition function syntax.
  $('.new-tweet form').submit((event) => {
    console.log('Handler for .submit() called.');
    event.preventDefault();
    console.log($(event.target).serialize());
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(event.target).serialize(),
    }).then(function () {
      console.log('Successfully loaded');
    });
  });





  
});
