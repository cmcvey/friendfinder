var path = require("path")
var fs = require("fs")


module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		var friends = require("../data/friends.json")
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var friends = require("../data/friends.json")
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: Infinity
		};

	 	var userData = req.body;
		var userScores = userData["scores[]"];

		var totalDifference;

		for (var i = 0; i < friends.length; i++){
			var currentFriend = friends[i];
			totalDifference = 0;

			console.log(currentFriend.name);

			for (var j = 0; j < currentFriend['scores[]'].length; j++) {
				var scores = currentFriend['scores[]']
      	var currentFriendScore = scores[j];
      	var currentUserScore = userScores[j];

				totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
    	}

			if (totalDifference <= bestMatch.friendDifference) {
				 // Reset the bestMatch to be the new friend.
				 bestMatch.name = currentFriend.name;
				 bestMatch.photo = currentFriend.photo;
				 bestMatch.friendDifference = totalDifference;
			}
	 	}



		friends.push(req.body);
		fs.writeFileSync(path.join(__dirname, "../data/friends.json"), JSON.stringify(friends));
		res.send(bestMatch)
	})
}
