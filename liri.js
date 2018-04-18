require("dotenv").config();

// load .env to use .env keys file
require("dotenv").config();

// Import  Keys
var keys = require("./keys.js");

// Import Twitter NPM pkg
var Twitter = require("twitter");

// Import node-spotify-api 
var Spotify = require("node-spotify-api");

// Import "request" NPM pkg
var request = require("request");

// Import FileSystem 
var fs = require("fs");

var action = process.argv[2];
var object = process.argv[3];

// Initialize spotify
var spotify = new Spotify({
    id: "e35e1b431858443396d3e51450d7d7de",
    secret: "9770ef8d5c1444cc9c085c0e9263c7f4"
});

// Initialize Twitter

var getTweets = function(tweets) {
	var client = new Twitter(keys.twitterKeys);

	var paramaters = {
		screen_name: "IntheDZone"
	};
	client.get("statuses/user_timeline", paramaters, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log("");
				console.log(tweets[i].text);
			}
		}
	});
};

// ******** SPOTIFY ********* //

var getSpotify = function(songName) {
	if (songName === undefined) {
		songName = "The Sign"
	}

	spotify.search(
	{
		type: "track",
		query: songName
	},
	function(err, data) {
		if (err) {
			console.log("Error occurred: " + err);
			return;
		}

		var songs = data.tracks.items;

		for (var i = 0; i < songs.length; i++) {
			console.log(i);
			console.log("Artist: " + songs[i].artists.map(getArtistNames));
			console.log("Song: " + songs[i].name);
			console.log("Preview: " + songs[i].preview_url);
			console.log("Album: " + songs[i].album.name);
			}
		}
	);
};




// ********* OMDB ************ //

var getMovie = function(movieName) {
	if (movieName === undefined) {
		movieName = "Mr Nobody";
	}

	var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

	request(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var jsonData = JSON.parse(body);

			console.log("Title: " + jsonData.Title);
			console.log("Year: " + jsonData.Year);
			console.log("Rated: " + jsonData.Rated);
			console.log("IMDB Rating: " + jsonData.imdbRating);
			console.log("Country: " + jsonData.Country);
			console.log("Language: " + jsonData.Language);
			console.log("Plot: " + jsonData.Plot);
			console.log("Cast: " + jsonData.Actors);
		}
	});
};



var doThis = function(thisThing) {

}


var action = function(caseData, functionData) {
	switch (caseData) {
		case "my-tweets":
			getTweets();
			break;
		case "spotify-this-song":
			getSpotify();
			break;
		case "movie-this":
			getMovie();
			break;
		case "do-what-it-says":
			doThis();
			break;
		default:
			console.log("Sorry. I didn't get that.");
	}
};


var nodeRun = function(argv1, argv2) {
	pick(argv1, argv2);
};


nodeRun(process.argv[2], process.argv[3]);


