# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above

## Features
0. When submit new Tweet, only this new tweet will be rendered to the page, which is not rendering all tweets; this is to help reducing outside http requests to the server.
1. Ability to submit tweets and view them in real time.
2. Ability to see how long ago tweet was posted.
3. Implemented 140 character limit and dynamic counter to keep track of number of characters remaining.
4. Responsive display to cater to multiple device sizes.
5. Animated indication for writing a new tweet.
6. Right corner button scrolls up to page top.
7. Error msg shows up if user inputs empty field or excess 140 character, and goes away when focusing in the input area. 

## Screenshots
!["screenshot of tweet compose box"](https://github.com/dylangit01/tweeter/blob/master/docs/tweet-box.png)
!["screenshot of tweets"](https://github.com/dylangit01/tweeter/blob/master/docs/tweeters.png)
