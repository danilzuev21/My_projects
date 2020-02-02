let LEVELS_NUMBER = 2;
class GameManager { // менеджер игры
	constructor() {
		this.player = new Player(); // указатель на объект игрока
		this.FPS = 30; // Число кадров в секунду
		this.ctx = document.getElementById('canvas').getContext('2d');
		this.time = 0; // Прошедшее время
		this.kills = 0;
		this.level = 1;
		this.updateInterval = null;
	}
	init() {
		soundManager.load(['Crash.mp3', 'GameOver.mp3', 'Move.mp3', 'Punch.mp3', 'Crash2.mp3', 'LevelUp.mp3']);
		mapManager.load("map1.json");
	}
	start() {
		this.init();
		document.getElementById('Level').innerHTML = '' + this.level + '/' + LEVELS_NUMBER;
		try {
			this.updateInterval = setInterval(this.update, 1000 / this.FPS);
		}
		catch (e) {
			console.log(e);
		}
	}
	update() {
		objectManager.update();
		gameManager.draw(); //Перерисовываем экран
		let t;
		while (t = eventsManager.popEvent()) {
			gameManager.processEvent(t);
		}
		gameManager.time += 1 / gameManager.FPS;
		updateTimer(gameManager.time, gameManager.kills);
	}
	processEvent(key) {
		switch (key) {
			case 37:
				this.player.goLeft();
				break;
			case 39:
				this.player.goRight();
				break;
			case 38:
				this.player.goUp();
				break;
			case 40:
				this.player.goDown();
				break;
			case 32:
				this.player.fire();
				break;
			default:
				break;
		}
	}
	nextLevel() {
		soundManager.play('LevelUp.mp3')
		objectManager.deleteAll(); // Bad if we are using some game controllers as entities
		++this.level;
		if (this.level <= LEVELS_NUMBER) {
			document.getElementById('Level').textContent = '' + this.level + '/' + LEVELS_NUMBER;
			mapManager.load('map' + this.level + '.json');
		}
		else {
			this.finish();
		}
	}
	finish() {
		clearInterval(this.updateInterval);
		addRecord(this.time, this.kills);
		document.location.href = 'records.html';
	}
	draw() {
		let ctx = this.ctx;
		mapManager.draw(this.ctx); // Перерисовываем карту
		objectManager.draw(this.ctx);
	}
}
function updateTimer(time, kills) {
	let date = new Date(null);
	let score = 1000 - time * 2 + kills * 100;
	date.setSeconds(time);
	let result = date.toISOString().substr(11, 8);
	document.getElementById('Time').innerHTML = result;
	document.getElementById('Score').innerHTML = Math.round(score);
	document.getElementById('Kills').innerHTML = kills;
}
function addRecord(time, kills) {
	let score = 1000 - time * 2 + kills * 100;
	let username = localStorage["ducks.username"];
	let records = localStorage["ducks.records"];
	if (records) {
		records = JSON.parse(records);
	} else {
		records = [];
		let obj = {
			score: score,
			name: username
		}
		records[0] = obj;
		for (let i = 1; i < 10; ++i) {
			let obj = {
				score: "none",
				name: "none"
			}
			records[i] = obj;
		}
		localStorage["ducks.records"] = JSON.stringify(records);
		return;
	}
	let row = 0;
	for (; row < records.length; ++row) {
		if (records[row].score < score)
			break;
	}
	if (row > 9)
		return;
	for (let i = records.length - 1; i > row; --i) {
		records[i].score = records[i - 1].score;
		records[i].name = records[i - 1].name;
	}
	records[row].score = score;
	records[row].name = username;
	localStorage["ducks.records"] = JSON.stringify(records);
}