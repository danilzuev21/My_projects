class ObjectManager {
	constructor() {
		this.objects = [];
	}
	update() {
		this.objects.forEach(function (object) {
			object.update();
		});
	}
	draw(ctx) {
		this.objects.forEach(function (object) {
			object.draw(gameManager.ctx);
		});

	}
	objectInPos(x, y){
		for (let i in this.objects) {
			if (this.objects[i].pos.x === x && this.objects[i].pos.y === y){
				console.log(typeof(this.objects[i]))
				return this.objects[i];
			}
		}
		return null;
	}
	addObject(object) {
		this.objects.push(object);
	}
	deleteAll() {
		this.objects = [];
	}
	deleteObject(object) {
		for (let i in this.objects) {
			if (this.objects[i] === object)
				this.objects.splice(i, 1);
		}
	}
}