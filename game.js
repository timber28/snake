function startGame() {
	class Pos {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.element = $(document.createElementNS(svg.ns, "rect")).attr({
				x, y,
				width: 1,
				height: 1,
				fill: "red",
			}).prependTo("#snakeContainer"); //debugging
		}
	}

	class Connector {
		constructor(x, y, dir, startSize) {
			this.x = x;
			this.y = y;
			this.dir = dir;
			this.size = startSize || 0;
			this.element = $(document.createElementNS(svg.ns, "line")).appendTo("#connectors");

			this.updateElement();
		}

		updateElement() {
			const [dx, dy] = game.vectors[this.dir];

			this.element.attr({
				x1: this.x,
				y1: this.y,
				x2: this.x + (dx * this.size),
				y2: this.y + (dy * this.size)
			});
		}

		grow(change) {
			this.size += change;
			this.updateElement();
		}

		shrink(change) {
			this.size -= change;

			const [dx, dy] = game.vectors[this.dir];
			this.x += dx * change;
			this.y += dy * change;

			if (this.size <= 0) {
				this.element.remove();
				snake.connectors.pop();
				return;
			}

			this.updateElement();
		}

		changeSize(action, change, snake) {
			if (action === "shrink") change = -change;
			this.size += change;




		}
	}

	class Apple {
		constructor() {
			let x, y;

			for (let i = 0; i <= 100; i++) {
				x = Math.floor(Math.random() * board.width);
				y = Math.floor(Math.random() * board.height);

				if (board.at(x, y) !== "empty") continue;

				this.x = x;
				this.y = y;
				this.element = $(document.createElementNS(svg.ns, "image"))
					.attr({
						x: this.x,
						y: this.y,
						href: data.images.apple.src,
					}).appendTo("#applesContainer");

				return;
			}

			alert("Something Went Wrong");
			console.warn("No Valid Apple Position Found");
		}
	}

	//Objects
	const snake = {
		x: 5,
		y: 1,
		speed: 5, //tiles per second
		direction: null,
		nextDirection: null,
		progress: 0,
		growing: false,

		connectors: [],
		occupies: [],

		move() {
			if (!this.direction) return;

			const oldProgress = this.progress;
			this.progress += this.speed;

			const head = this.connectors[0];
			const tail = this.connectors.at(-1);

			head.grow(this.speed / 100);
			if (!this.growing) tail.shrink(this.speed / 100);

			this.updateEyes();

			//At 50% 
			if (oldProgress < 50 && this.progress >= 50) {
				this.growing = false;

				const [dx, dy] = game.vectors[this.direction];

				this.x += dx;
				this.y += dy;

				const result = board.at(this.x, this.y); //check before occupy

				switch (result) {
					//gameover if wall or tail
					case "wall": game.causeEnd = "You hit a wall"; break;
					case "snake": game.causeEnd = "You bit your tail"; break;

					case "apple":
						this.growing = true;

						const index = board.apples.findIndex(apple => apple.x === this.x && apple.y === this.y);
						board.apples[index].element.remove(); //remove apple image
						board.apples = board.apples.splice(index, 1); //remove apple
						board.createApples(1); //add apple

						this.occupies.push(null); //add buffer to remove later

						//achievements
						profile.stats.totalApplesEaten++;
						if (this.occupies.length > profile.stats.mostSnakeParts) profile.stats.mostSnakeParts = this.occupies.length;
						break;
				}

				//update occupying squares
				this.occupies.unshift(new Pos(this.x, this.y));
				this.occupies.at(-1)?.element.remove(); //debugging
				this.occupies.pop();
			}

			//At 100%
			if (this.progress >= 100) {
				if (this.nextDirection != this.direction) {
					this.direction = this.nextDirection;

					this.connectors.unshift(new Connector(this.x, this.y, this.direction));
				};
			}

			if (this.progress >= 100) this.progress %= 100;
		},

		create() {
			$("#connectors").empty(); //remove old snake parts
			$("#snakeContainer").children("rect").remove(); //for debugging
			$("#connectors").attr("stroke", profile.currentSnake); //set snake color

			this.connectors = [new Connector(3, 1, "right", 2)];
			this.occupies = [new Pos(5, 1), new Pos(4, 1), new Pos(3, 1)];
		},

		updateEyes() {
			const head = this.connectors[0];
			const angle = game.angles[this.direction] || 0;
			const tx = +head.element.attr("x2") + 0.5;
			const ty = +head.element.attr("y2") + 0.5;

			$("#eyes").attr(
				"transform",
				`translate(${tx} ${ty}) rotate(${angle})`
			);
		},

		changeDirection(e) {
			const map = {
				arrows: {
					ArrowUp: "up",
					ArrowDown: "down",
					ArrowLeft: "left",
					ArrowRight: "right",
				},
				wasd: {
					w: "up",
					s: "down",
					a: "left",
					d: "right",
				}
			}

			let result = map[profile.settings.controls][e.key];
			if (!result || result === game.opposites[snake.direction]) return;
			if (!snake.direction) snake.direction = result;
			snake.nextDirection = result;
		}
	}

	const board = {
		apples: [],
		level: data.boards[profile.currentBoard],

		tileSize: null,
		get rows() { return this.level.trim().split('\n') },
		get width() { return this.rows[0].length },
		get height() { return this.rows.length },

		createApples(n) {
			$("#applesContainer").empty(); //remove existing apples
			for (let i = 0; i < n; i++) this.apples.push(new Apple());
		},

		at(x, y) {
			const char = this.rows[y][x];
			if (char === "#") return "wall";
			if (board.apples.some(apple => apple.x === x && apple.y === y)) return "apple";
			if (snake.occupies.some(part => part.x === x && part.y === y)) return "snake";
			return "empty";
		},

		build() {
			$("#boardContainer").empty();
			for (let y = 0; y < this.height; y++) {
				for (let x = 0; x < this.width; x++) {
					const char = this.rows[y][x];
					let color;

					//choose the color
					if (char === "#") color = "black";
					else color = (x + y) % 2 ? "white" : "#C0C0C0";

					$(document.createElementNS(svg.ns, "rect"))
						.attr({
							x: x,
							y: y,
							width: 1,
							height: 1,
							fill: color,
						}).appendTo("#boardContainer");
				}
			}
		},
	}

	const game = {
		scale: devicePixelRatio || 1,
		opposites: {
			left: "right",
			up: "down",
			right: "left",
			down: "up",
		},

		angles: {
			right: 0,
			down: 90,
			left: 180,
			up: 270,
		},

		vectors: {
			left: [-1, 0],
			right: [1, 0],
			up: [0, -1],
			down: [0, 1],
		},

		prepareSVG() {
			const margin = 20;

			//calculate tileSize
			let tileSize = Math.floor(
				Math.min(
					(innerWidth - (margin * 2)) / board.width,
					(innerHeight - (margin * 2)) / board.height
				) / 4) * 4;

			svg.width = board.width * tileSize * game.scale;
			svg.height = board.height * tileSize * game.scale;

			svg.css({
				width: svg.width / game.scale,
				height: svg.height / game.scale
			});

			//transforms
			svg.attr("viewBox", `0 0 ${board.width} ${board.height}`);
		},

		update() {
			snake.move();

			if (game.causeEnd) game.over(game.causeEnd);
			else requestAnimationFrame(game.update);
		},

		over(reason) {
			$(window).off("keydown");

			setTimeout(() => {
				//draw the game over screen

				setTimeout(() => {
					popup("close", "game");
					$("#home").removeClass("hidden");
					$(":focus").blur();
				}, 1000);
			}, 1000);
		}
	}

	game.prepareSVG(); //set SVG transforms

	board.build(); //build board
	board.createApples(1); //create apple
	snake.create(); //create snake
	snake.updateEyes();

	popup("open", "game"); //display game

	//start update loop
	game.update();

	$(window).on("keydown", snake.changeDirection);
}