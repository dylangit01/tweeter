/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  
  // Loop tweets array and create HTML template for each tweet:
  const renderTweets = function (tweets) {
    tweets.reverse().forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

  const createTweetElement = function (data) {
    const { user: { name, avatars, handle }, content: { text }, created_at, } = data;
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    return $(`
		<article class='tweet'>
			<header>
				<div class="faceName">
					<span><img src="${avatars}" alt="userAvatar"/></i>${name}</span>
					<span>${handle}</span>
				</div>
				<p>${escape(text)}</p>
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

  // Post tweet fn:
  const postTweet = (event) => {
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(event.target).serialize(),
    }).then(() => {
      console.log('Successfully loaded');
      location.reload();
    });
  };

  // Fn using "this" has to use tradition function syntax:
  $('.new-tweet form').submit((event) => {
    console.log('Handler for .submit() called.');
    event.preventDefault();
    const tweetInput = $('#tweet-text').val();
    const maxInputChar = $('form output').text();
    const errMsgBox = $('.container h2');
    const trimmedInput = tweetInput.trim();
    if (tweetInput === '' || trimmedInput.length === 0) {
      $(errMsgBox).slideDown('slow', () => {
        $(errMsgBox).text('⚠️ Tweet content cannot be empty, please try again ⚠️');
      });
      $('#tweet-text').on('focus', () => $(errMsgBox).slideUp());
      return;
    } else if (maxInputChar < 0) {
      $(errMsgBox).slideDown('slow', () => {
        $(errMsgBox).text('⚠️ Tweet content should be less then 140 characters ⚠️');
      });
      $('#tweet-text').on('focus', () => $(errMsgBox).slideUp());
      return;
    }
    postTweet(event);
  });

  // For toggling compose new tweet fn:
  const toggleComposeNewTweet = () => {
    const angleDown = $('.fa-angle-double-down');
    const newTweet = $('.new-tweet');
    const sideTitle = $('.sideTitle');

    $(sideTitle).click(() => {
      $(newTweet).animate({ down: '10px' });
      $(newTweet).toggle();
    });

    setInterval(() => {
      $(angleDown).slideDown(300);
      $(angleDown).slideUp(300);
    }, 500);
  };

  toggleComposeNewTweet();
});
