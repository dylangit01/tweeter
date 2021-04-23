/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function () {
  // Loop tweets array and create HTML template for each tweet:
  const renderTweets = function (tweets) {
    tweets.reverse().forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

  // Only rendering the last tweet from loadTweet function:
  const renderLastTweet = function (tweet) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
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

  // ***Important: if condition is making sure that only the last tweet has been prepended to the main container when submitting, else rendering all
  const loadTweets = (isNewTweet) => {
    $.ajax({ url: '/tweets' }).then((data) => {
      if (isNewTweet) {
        renderLastTweet(data[data.length - 1]);
      } else {
        renderTweets(data);
      }
    });
  };

  // Load the page at the very beginning.
  loadTweets(false);

  // Post tweet fn:
  const postTweet = (event) => {
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(event.target).serialize(),
    }).then(() => {
      $('#tweet-text').val('');
      $('form output').text('140');
      loadTweets(true);
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
    // When submit the tweet, ajax will make post call to server:
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
      $('#tweet-text').focus();
    });

    $(angleDown).click(() => {
      $(newTweet).toggle();
      $('#tweet-text').focus();
    });

    setInterval(() => {
      $(angleDown).animate({ height: '40px' }, 300);
      $(angleDown).animate({ height: '20px' }, 300);
    }, 300);
  };

  toggleComposeNewTweet();

  // Scroll up to top:
  $('.fa-chevron-circle-up').click(() => window.scrollTo(0, 0));
});
