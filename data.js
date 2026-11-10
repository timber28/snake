const svg = $("#game svg");
svg.ns = "http://www.w3.org/2000/svg";

const data = {
	achievements: [
		{
			name: "Hungry",
			description: "Eat 10 apples",
			stat: "totalApplesEaten",
			requirement: 10,
			reward: 50,
		},{
			name: "Starving",
			description: "Eat 50 apples",
			stat: "totalApplesEaten",
			requirement: 50,
			reward: 100,
		},{
			name: "Famished",
			description: "Eat 100 apples",
			stat: "totalApplesEaten",
			requirement: 100,
			reward: 500,
		},{
			name: "Long Snake",
			description: "Have 10 parts at one time",
			stat: "mostSnakeParts",
			requirement: 10,
			reward: 100,
		},{
			name: "Shopper",
			description: "Spend 100 coins",
			stat: "coinsSpent",
			requirement: 100,
			reward: 100,
		},{
			name: "Stylish",
			description: "Obtain 5 snakes",
			stat: "totalSnakes",
			requirement: 5,
			reward: 100,
		},
	],
	boards: [`
###########
#   >     #
#         #
#         #
#   ###   #
#   ###   #
#         #
#         #
#         #
###########`,`
#########
#   >   #
# ## ## #
# #   # #
#   #   #
# #   # #
# ## ## #
#       #
#########`,
	],
	snakes:     ["darkred","red","orange","green","blue","darkblue","purple"],
	snakeCosts: [50, 50, 50, 50, 50, 50, 50],
	images: {
		apple: null,
		effects: {
			high: "effects-high",
			medium: "effects-medium",
			low: "effects-low",
			mute: "effects-mute",
		},
		music: {
			high: "music-high",
			medium: "music-medium",
			low: "music-low",
			mute: "music-mute",
		}
	}
};

const initialProfile = {
	snakes: ["darkred"],
	boards: [0],
	achievements: [],
	currentSnake: "darkred",
	currentBoard: 0,
	coins: 0,
	stats: {
		totalApplesEaten: 0,
		coinsSpent: 0,
		mostSnakeParts: 3,
		totalSnakes: 1,
	},
	settings: {
		music: 100,
		effects: 100,
		controls: "arrows",
	},
}

let profile = JSON.parse(localStorage.getItem("profile")) || initialProfile;

profile.reset = function() {
	profile = initialProfile;
	location.reload();
};

(function loadImages(obj) {
	Object.keys(obj).forEach(key => {
		let value = obj[key];

		if (value && value.constructor === Object) {
			loadImages(value);
			return;
		}

		const image = new Image();
		image.src = `images/${value ? value : key}.png`
		obj[key] = image;
	});
})(data.images);