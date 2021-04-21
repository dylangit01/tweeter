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
				<span class="timePassed" datetime="${created_at}"></span>
				<span>
					<i class="fas fa-flag fa-xs"></i>
					<i class="fas fa-retweet fa-xs"></i>
					<i class="fas fa-heart fa-xs"></i>
				</span>
			</footer>
		</article>
	`);
};

$('document').ready(function () {
  renderTweets(data);

  const formSub = $('[action]')[0];
  console.log(formSub);
  $(formSub).submit((event) => {
    console.log('Handler for .submit() called.');
    event.preventDefault();
  });
});


