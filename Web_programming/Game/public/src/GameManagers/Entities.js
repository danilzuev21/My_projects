let Direction = {
	left: 0,
	up: 1,
	right: 2,
	down: 3
}
let PlayerCoords = {
	x: 0,
	y: 0
}

class Entity {
	constructor(pos = { x: 0, y: 0 }, direction = Direction.up, type = null) {
		this.type = type;
		this.pos = {};
		this.pos.x = pos.x;
		this.pos.y = pos.y;
		this.sprite = new Image();
		this.direction = direction;
	}
	draw(ctx) {
		ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
	}
	update() { }
};

class Bullit extends Entity {
	constructor(pos, direction) {
		super(pos, direction, "Bullit");
		this.direction = direction;
		this.sprite.src = '../../Maps/textures/bullit.png'
		this.timer = 0;
		this.speed = 5;
	}
	update() {
		++this.timer;
		if (this.timer != this.speed) {
			return;
		}
		this.timer = 0;
		let x = this.pos.x;
		let y = this.pos.y;
		switch (this.direction) {
			case 0:
				x -= 32;
				if (objectManager.objectInPos(x, y) != null) {
					soundManager.play("Crash.mp3");
					if (objectManager.objectInPos(x, y).type === "Player") {
						soundManager.play("GameOver.mp3");
						console.log('end');
						clearInterval(gameManager.updateInterval);
						gameManager.ctx.fillText("GAME OVER", 100, 300);
					}
					if (objectManager.objectInPos(x, y).type === "Enemy")
						gameManager.kills++;
					objectManager.deleteObject(objectManager.objectInPos(x, y))
					objectManager.deleteObject(this);
				}
				if (!mapManager.isFree(x, y)) {
					objectManager.deleteObject(this);
					return;
				}
				this.pos.x = x;
				break;
			case 1:
				y -= 32;
				if (objectManager.objectInPos(x, y) != null) {
					soundManager.play("Crash.mp3");
					if (objectManager.objectInPos(x, y).type === "Player") {
						soundManager.play("GameOver.mp3");
						console.log('end');
						clearInterval(gameManager.updateInterval);
						gameManager.ctx.fillText("GAME OVER", 100, 300);
					}
					if (objectManager.objectInPos(x, y).type === "Enemy")
						gameManager.kills++;
					objectManager.deleteObject(objectManager.objectInPos(x, y))
					objectManager.deleteObject(this);
				}
				if (!mapManager.isFree(x, y)) {
					objectManager.deleteObject(this);
					return;
				}
				this.pos.y = y;
				break;
			case 2:
				x += 32
				if (objectManager.objectInPos(x, y) != null) {
					soundManager.play("Crash.mp3");
					if (objectManager.objectInPos(x, y).type === "Player") {
						soundManager.play("GameOver.mp3");
						console.log('end');
						clearInterval(gameManager.updateInterval);
						gameManager.ctx.fillText("GAME OVER", 100, 300);
					}
					if (objectManager.objectInPos(x, y).type === "Enemy")
						gameManager.kills++;
					objectManager.deleteObject(objectManager.objectInPos(x, y))
					objectManager.deleteObject(this);
				}
				if (!mapManager.isFree(x, y)) {
					objectManager.deleteObject(this);
					return;
				}
				this.pos.x = x;
				break;
			case 3:
				y += 32;
				if (objectManager.objectInPos(x, y) != null) {
					soundManager.play("Crash.mp3");
					if (objectManager.objectInPos(x, y).type === "Player") {
						soundManager.play("GameOver.mp3");
						console.log('end');
						clearInterval(gameManager.updateInterval);
						gameManager.ctx.fillText("GAME OVER", 100, 300);
					}
					if (objectManager.objectInPos(x, y).type === "Enemy")
						gameManager.kills++;
					objectManager.deleteObject(objectManager.objectInPos(x, y))
					objectManager.deleteObject(this);
				}
				if (!mapManager.isFree(x, y)) {
					objectManager.deleteObject(this);
					return;
				}
				this.pos.y = y;
				break;
		}
	}
}

class Player extends Entity {
	constructor(pos = { x: 0, y: 0 }, direction = Direction.up) {
		super(pos, direction, "Player");
		this.sprite.src = '../../Maps/textures/player/tank' + this.direction + '.png';
	}
	fire() {
		soundManager.play("Punch.mp3");
		
		let x = this.pos.x;
		let y = this.pos.y;
		switch (this.direction) {
			case 0:
				if (objectManager.objectInPos(x - 32, y)) {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x - 32, y));
					gameManager.kills++;
					return;
				}
				if (mapManager.isFree(x - 32, y)) {
					let bullit = new Bullit({ x: x - 32, y: y }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
			case 1:
				if (objectManager.objectInPos(x, y - 32)) {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x, y - 32));
					gameManager.kills++;
					return;
				}
				if (mapManager.isFree(x, y - 32)) {
					let bullit = new Bullit({ x: x, y: y - 32 }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
			case 2:
				if (objectManager.objectInPos(x + 32, y)) {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x + 32, y));
					gameManager.kills++;
					return;
				}
				if (mapManager.isFree(x + 32, y)) {
					let bullit = new Bullit({ x: x + 32, y: y }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
			case 3:
				if (objectManager.objectInPos(x, y + 32)) {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x, y + 32));
					gameManager.kills++;
					return;
				}
				if (mapManager.isFree(x, y + 32)) {
					let bullit = new Bullit({ x: x, y: y + 32 }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
		}
	}
	update() {
		PlayerCoords.x = this.pos.x;
		PlayerCoords.y = this.pos.y;
		if (mapManager.isExit(this.pos.x, this.pos.y)) {
			gameManager.nextLevel();
		}
	}
	goUp = () => {
		let x = this.pos.x,
			y = this.pos.y - 32;
		if (mapManager.isFree(x, y)) {
			this.pos.y = y;
			PlayerCoords.y = this.pos.y;
			soundManager.play('Move.mp3')
		}
		this.direction = 1;
		this.sprite.src = '../../Maps/textures/player/tank' + this.direction + '.png';
	}
	goDown = () => {
		let x = this.pos.x,
			y = this.pos.y + 32;
		if (mapManager.isFree(x, y)) {
			this.pos.y = y;
			PlayerCoords.y = this.pos.y;
			soundManager.play('Move.mp3')
		}
		this.direction = 3;
		this.sprite.src = '../../Maps/textures/player/tank' + this.direction + '.png';
	}
	goRight = () => {
		let x = this.pos.x + 32,
			y = this.pos.y;
		if (mapManager.isFree(x, y)) {
			this.pos.x = x;
			PlayerCoords.x = this.pos.x;
			soundManager.play('Move.mp3')
		}
		this.direction = 2;
		this.sprite.src = '../../Maps/textures/player/tank' + this.direction + '.png';
	}
	goLeft = () => {
		let x = this.pos.x - 32,
			y = this.pos.y;
		if (mapManager.isFree(x, y)) {
			this.pos.x = x;
			PlayerCoords.x = this.pos.x;
			soundManager.play('Move.mp3')
		}
		this.direction = 0;
		this.sprite.src = '../../Maps/textures/player/tank' + this.direction + '.png';
	}
};

class Enemy extends Entity {
	constructor(pos = { x: 0, y: 0 }, direction = Direction.up, id) {
		super(pos, direction, "Enemy");
		this.id = id;
		console.log();
		this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
		this.timer = 0;
	}
	fire() {
		soundManager.play("Punch.mp3");
		let x = this.pos.x;
		let y = this.pos.y;
		switch (this.direction) {
			case 0:
				if (objectManager.objectInPos(x - 32, y)!= null && objectManager.objectInPos(x - 32, y).type === "Player") {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x - 32, y));
					soundManager.play("GameOver.mp3");
					console.log('end');
					clearInterval(gameManager.updateInterval);
					gameManager.ctx.fillText("GAME OVER", 100, 300);
					return;
				}
				if (mapManager.isFree(x - 32, y)) {
					let bullit = new Bullit({ x: x - 32, y: y }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
			case 1:
				if(objectManager.objectInPos(x - 32, y)!= null && (objectManager.objectInPos(x, y - 32).type === "Player")) {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x, y - 32));
					soundManager.play("GameOver.mp3");
					console.log('end');
					clearInterval(gameManager.updateInterval);
					gameManager.ctx.fillText("GAME OVER", 100, 300);
					return;
				}
				if (mapManager.isFree(x, y - 32)) {
					let bullit = new Bullit({ x: x, y: y - 32 }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
			case 2:
				if (objectManager.objectInPos(x - 32, y)!= null && objectManager.objectInPos(x + 32, y).type === "Player") {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x + 32, y));
					soundManager.play("GameOver.mp3");
					console.log('end');
					clearInterval(gameManager.updateInterval);
					gameManager.ctx.fillText("GAME OVER", 100, 300);
					return;
				}
				if (mapManager.isFree(x + 32, y)) {
					let bullit = new Bullit({ x: x + 32, y: y }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
			case 3:
				if (objectManager.objectInPos(x - 32, y)!= null && objectManager.objectInPos(x, y + 32).type === "Player") {
					soundManager.play("Crash.mp3");
					objectManager.deleteObject(objectManager.objectInPos(x, y + 32));
					soundManager.play("GameOver.mp3");
					console.log('end');
					clearInterval(gameManager.updateInterval);
					gameManager.ctx.fillText("GAME OVER", 100, 300);
					return;
				}
				if (mapManager.isFree(x, y + 32)) {
					let bullit = new Bullit({ x: x, y: y + 32 }, this.direction);
					objectManager.addObject(bullit);
				}
				break;
		}
	}
	update() {
		++this.timer;
		this.timer = this.timer % 15;
		if (this.timer == 15 || this.timer == 15) {
			let dx = this.pos.x - PlayerCoords.x;
			let dy = this.pos.y - PlayerCoords.y;
			if (dx == 0) {
				if (dy > 0) {
					this.direction = Direction.up;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
					this.fire();
				} else {
					this.direction = Direction.down;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
					this.fire();
				}
			}
			if (dy == 0) {
				if (dx > 0) {
					this.direction = Direction.left;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
					this.fire();
				} else {
					this.direction = Direction.right;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
					this.fire();
				}
			}
		}
		if (this.timer != 15 - this.id * 4)
			return;
		let tmp = null;
		let dx = this.pos.x - PlayerCoords.x;
		let dy = this.pos.y - PlayerCoords.y;
		if (Math.abs(dx) > Math.abs(dy)) {
			if (dx > 0) {
				if (mapManager.isFree(this.pos.x - 32, this.pos.y)) {
					this.pos.x = this.pos.x - 32;
					this.direction = Direction.left;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
				} else {
					if (dy > 0) {
						if (mapManager.isFree(this.pos.x, this.pos.y - 32)) {
							this.pos.y = this.pos.y - 32;
							this.direction = Direction.up;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					} else {
						if (mapManager.isFree(this.pos.x, this.pos.y + 32)) {
							this.pos.y = this.pos.y + 32;
							this.direction = Direction.down;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					}
				}
			} else {
				if (mapManager.isFree(this.pos.x + 32, this.pos.y)) {
					this.pos.x = this.pos.x + 32;
					this.direction = Direction.right;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
				} else {
					if (dy > 0) {
						if (mapManager.isFree(this.pos.x, this.pos.y - 32)) {
							this.pos.y = this.pos.y - 32;
							this.direction = Direction.up;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					} else {
						if (mapManager.isFree(this.pos.x, this.pos.y + 32)) {
							this.pos.y = this.pos.y + 32;
							this.direction = Direction.down;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					}
				}
			}
		} else {
			if (dy > 0) {
				if (mapManager.isFree(this.pos.x, this.pos.y - 32)) {
					this.pos.y = this.pos.y - 32;
					this.direction = Direction.up;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
				} else {
					if (dx > 0) {
						if (mapManager.isFree(this.pos.x - 32, this.pos.y)) {
							this.pos.x = this.pos.x - 32;
							this.direction = Direction.left;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					} else {
						if (mapManager.isFree(this.pos.x + 32, this.pos.y)) {
							this.pos.x = this.pos.x + 32;
							this.direction = Direction.right;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					}
				}
			} else {
				if (mapManager.isFree(this.pos.x, this.pos.y + 32)) {
					this.pos.y = this.pos.y + 32;
					this.direction = Direction.down;
					this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
				} else {
					if (dx > 0) {
						if (mapManager.isFree(this.pos.x - 32, this.pos.y)) {
							this.pos.x = this.pos.x - 32;
							this.direction = Direction.left;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					} else {
						if (mapManager.isFree(this.pos.x + 32, this.pos.y)) {
							this.pos.x = this.pos.x + 32;
							this.direction = Direction.right;
							this.sprite.src = '../../Maps/textures/enemy/enemy' + this.direction + '.png';
						}
					}
				}
			}
		}
	}
}