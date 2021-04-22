/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function () {
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

  const postTweet = (event) => {
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(event.target).serialize(),
    }).then(() => {
      console.log('Successfully loaded');
      location.reload();
      // $('#tweet-text').val('')
      // $('form output').text('140')
      // $('#tweets-container').empty()
      // loadTweets()
    });
  };

  // Fn using "this" has to use tradition function syntax:
  $('.new-tweet form').submit((event) => {
    console.log('Handler for .submit() called.');
    event.preventDefault();
    const tweetInput = $('#tweet-text').val();
    const maxInputChar = $('form output').text();
    const errMsgBox = $('.container h2');
    if (tweetInput === '') {
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
    // console.log($(event.target).serialize());
    postTweet(event);
  });

  // const angleDown = $('.fa-angle-double-down');
  // const newTweet = $('#new-tweet');

  // why this not working?
  // const makeErrBoxEl = function() {
  //   const $errBoxEl =  $(`
  //     <h2><i class="fas fa-exclamation-triangle"></i>Tweet content cannot be empty, please try again<i class="fas fa-exclamation-triangle"></i></h2>
  //   `);
  //     $('.container').append($errBoxEl)
  //     $('.new-tweet form').submit(() => $(errMsgBox).slideUp());
  // }

  // const $errBoxEl = makeErrBoxEl()
 
});
