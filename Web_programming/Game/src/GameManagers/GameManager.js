'use strict'

let LEVELS_NUMBER = 2;

class GameManager { // менеджер игры
	constructor() {
		this.player = new Player(); // указатель на объект игрока
		this.FPS = 30; // Число кадров в секунду
		this.ctx = document.getElementById('canvas').getContext('2d');
		this.time = 0; // Прошедшее время
		this.level = 1;
		this.updateInterval = null;
	}
	init() {
		soundManager.load(['grassStep.mp3', 'pop.mp3']);
		mapManager.load("map1.json");
	}
	start() {
		this.init();
		document.getElementById('Level').textContent = '' + this.level + '/' + LEVELS_NUMBER;
		// This type of game cycle works for light games only
		this.updateInterval = setInterval(this.update, 1000 / this.FPS);
	}
	update() {
		if (physicsManager.entityAt(gameManager.player.pos.x, gameManager.player.pos.y).length > 1)
			gameManager.finish();
		objectManager.update();
		gameManager.draw(); //Перерисовываем экран
		let t;
		while (t = eventsManager.popEvent()) {
			gameManager.processEvent(t);
		}
		gameManager.time += 1 / gameManager.FPS;
		updateTimer(gameManager.time);
	}

	processEvent(key) {
		switch (key) {
			case 'ArrowLeft':
				this.player.goLeft();
				break;
			case 'ArrowRight':
				this.player.goRight();
				break;
			case 'ArrowUp':
				this.player.goUp();
				break;
			case 'ArrowDown':
				this.player.goDown();
				break;
			default:
				break;
		}
	}

	nextLevel() {
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
		addRecord(this.time);
		document.location.href = 'records.html';
	}

	draw() {
		let ctx = this.ctx;
		mapManager.draw(this.ctx); // Перерисовываем карту
		objectManager.draw(this.ctx);
	}
}

function updateTimer(secs) {
	let date = new Date(null);
	date.setSeconds(secs);
	let result = date.toISOString().substr(11, 8);
	document.getElementById('Time').textContent = result;
}

function addRecord(time) {
	let date = new Date(null);
	date.setSeconds(time);
	let score = date.toISOString().substr(11, 8);
	// console.log("In add record()");
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
				score: -1,
				name: "Empty"
			}
			records[i] = obj;
		}
		localStorage["ducks.records"] = JSON.stringify(records);
		return;
	}

	// Searching for record's place:
	let row = 0;
	for (; row < records.length; ++row) {
		if (records[row].score < score)
			break;
	}

	// Exit if it's not a record:
	if (row > 9)
		return;

	// Moving rows
	for (let i = records.length - 1; i > row; --i) {
		records[i].score = records[i - 1].score;
		records[i].name = records[i - 1].name;
	}

	// Putting new record
	records[row].score = score;
	records[row].name = username;
	localStorage["ducks.records"] = JSON.stringify(records);
}

console.log("Loaded GameManager.js")
