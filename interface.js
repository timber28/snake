//-------------------------- Base Objects ---------------------------
const snakes = {
	update() {
		$("#coinDisplay p").text(profile.coins);
		$("#previewSnake line").attr("stroke", profile.currentSnake);

		$("#selectBtns").children().hide();
		$("#selectedText").show();

		for (let i = -3; i <= 3; i++) {
			const circle = $("#snakeChoices").children().eq(i + 3)
				.attr("fill", snakes.from(profile.currentSnake, i));

			//if you don't own the snake create a lock over it
			if (!profile.snakes.includes(circle.attr("fill"))) createLock((i * 8));

			//select middle snake
			if (i === 0) circle.addClass("selected");
			else circle.removeClass("selected");
		}
	},

	move(offset) {
		if (offset === 0) return;

		//DOM variables
		const outerContainer = $("#snakeMenu");
		const circleContainer = $("#snakeChoices");
		const lockContainer = $("#lockImages");

		const oldSelected = circleContainer.children().eq(3).attr("fill");
		const chosenSnake = circleContainer.children().eq(offset + 3).attr("fill");
		const sign = Math.sign(offset);

		$("#previewSnake line").attr("stroke", chosenSnake);

		for (let x = 1; x <= Math.abs(offset); x++) {
			const circle = $(document.createElementNS(svg.ns, "circle"))
				.attr("cx", (x + 3) * 8 * sign)
				.attr("fill", snakes.from(oldSelected, (x + 3) * sign));

			if (circle.attr("fill") === profile.currentSnake) circle.addClass("selected");

			if (sign > 0) circleContainer.append(circle);
			else circleContainer.prepend(circle);

			if (!profile.snakes.includes(circle.attr("fill"))) createLock((x + 3) * 8 * sign);
		}

		outerContainer.addClass("slide");
		outerContainer.css("transform", `translateX(${-offset * 8}px)`);

		outerContainer.one("transitionend", (e) => {
			//delete lock images and circles off the screen
			circleContainer.children().filter((i, child) => {
				const x = child.getAttribute("cx");
				return (Math.abs(x - (8 * offset)) > 24);
			}).remove();

			lockContainer.children().filter((i, child) => {
				const x = child.getAttribute("x");
				return (Math.abs(x - (8 * offset)) > 24);
			}).remove();


			//jump back
			outerContainer.removeClass("slide");
			outerContainer.css("transform", "translateX(0)");

			//reset circle and lockimage Xs
			circleContainer.children().attr("cx", i => (i - 3) * 8)
			lockContainer.children().attr("x", (i, current) => current - (offset * 8));

			//show correct button
			if (chosenSnake === profile.currentSnake) snakes.showBtn("text");
			else if (profile.snakes.includes(chosenSnake)) snakes.showBtn("select");
			else snakes.showBtn("unlock");
		});
	
	},

	from(snake, offset) {
		const arr = data.snakes;
		const i = arr.indexOf(snake) + offset;
		const wrapped = i % arr.length;

		return arr.at(wrapped);
	},

	showBtn(btn) {
		$("#selectBtns").children().hide();
		switch (btn) {
			case "text": $("#selectedText").show(); break;
			case "select": $("#selectBtn").show(); break;
			case "unlock":
				$("#unlockBtn").show();
				$("#unlockBtn span").text(data.snakeCosts[data.snakes.indexOf(profile.currentSnake)]);
			break;
		}
	},

	handlers: {
		circleClick(e) {
			const i = $("#snakeChoices").children().index(e.target);
			if (i === -1) return;
			snakes.move(i - 3);
		},

		selectBtn() {
			const circle = $("#snakeChoices").children().eq(3);
			profile.currentSnake = circle.attr("fill");
			$(".selected").removeClass("selected");
			circle.addClass("selected");

			snakes.showBtn("text");
		},

		unlockBtn() {
			const cost = 50;
			if (cost > profile.coins) {
				alert("Not Enough Coins!");
				return;
			}

			const chosenSnake = $("#snakeChoices").children().eq(3).attr("fill");
			profile.snakes.push(chosenSnake);
			profile.coins -= cost;
			$("#coinDisplay p").text(profile.coins);
			$("#lockImages").children().filter((i, img) => img.getAttribute("x") === 0).remove();
			selectSnake();

		}
	}
}

const achievements = {
	update() {
		const grid = $("#grid");
		grid.html("");

		data.achievements.forEach(achievement => {
			const current = profile.stats[achievement.stat];
			let complete = current >= achievement.requirement;
			let button = "<button>Collect</button>";
			let meter = `
				<span>
					<meter value="${current}" min="0" max="${achievement.requirement}"></meter>
					<p>${current}/${achievement.requirement}</p>
				</span>
				`;

			grid.append(`
				<div class="achievement">
					<h3>${achievement.name}</h3>
					<h4>${achievement.description}</h4>
					${complete ? button : meter}
					<p>Reward:<img class="coinImg" src="images/coin.png">${achievement.reward}</p>
				</div>`
			);
		});
	}
}

const settings = {
	update() {
		this.updateVolumeDisplay("effects");
		this.updateVolumeDisplay("music");

		$("#" + profile.settings.controls).prop("checked", true);

	},

	updateVolumeDisplay(type) {
		const value = profile.settings[type];
		const img = $(`#${type} img`)[0];
		const slider = $(`#${type} input`)[0];

		//update img
		if (value > 75) img.src = data.images[type].high.src;
		else if (value > 40) img.src = data.images[type].medium.src;
		else if (value > 0) img.src = data.images[type].low.src;
		else img.src = data.images[type].mute.src;

		//update slider
		slider.value = profile.settings[type];
	},

	handlers: {
		volumeImg(e) {
			const type = e.target.parentElement.id;
			if (profile.settings[type] === 0) profile.settings[type] = 100;
			else profile.settings[type] = 0;

			settings.updateVolumeDisplay(type);
		},

		volumeSlider(e) {
			const type = $(e.target).parent()[0].id;
			profile.settings[type] = $(`#${type} input`)[0].value;
			settings.updateVolumeDisplay(type);
		},

		controlsOptions(e) {
			profile.settings.controls = e.target.id;
		}
	}
}

//----------------------- Helper Functions --------------------------
function popup(action, id) {
	if (action === "open") {
		$("#home").addClass("blurred");
		({snakes, achievements, settings})[id]?.update();
		$(`#${id}`).removeClass("hidden");
	}

	if (action === "close") {
		$("#home").removeClass("blurred");
		$(`#${id}`).addClass("hidden");
	}
}

function createLock(x) {
	const lock = $(document.createElementNS(svg.ns, "image"))
		.attr({
			x: x,
			width: 3,
			height: 3,
			href: "images/lock.png",
		});

	$("#lockImages").append(lock);
}

//---------------------------- Events -------------------------------
//universal
$("#options button").click(e => popup("open", e.target.textContent.toLowerCase()));
$(".close").click(e => popup("close", e.target.parentElement.id));

//settings
$("#volume input").on("input", settings.handlers.volumeSlider);
$("#volume img").click(settings.handlers.volumeImg);
$("#controls input[type=radio]").change(settings.handlers.controlsOptions);

//snakes
$("#snakeChoices").click(snakes.handlers.circleClick);
$("#selectBtn").click(snakes.handlers.selectBtn);
$("#unlockBtn").click(snakes.handlers.unlockBtn);

//save profile on close
$(window).on("beforeunload", () => {
	localStorage.setItem("profile", JSON.stringify(profile));
});