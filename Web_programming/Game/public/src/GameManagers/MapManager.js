class MapManager {
	constructor() {
		this.currentMap = 0;
		this.mapData = null; // Информация о карте
		this.tLayer = null; // Текущий тайл
		this.xCount = null;
		this.yCount = null;
		this.imgLoadCount = 0; // количество загруженных изображений
		this.loaded = false;
		this.tSize = { x: null, y: null }; //Размер тайла
		this.mapSize = { x: null, y: null }; // Размер карты
		this.tilesets = []; // Массив для хранения тайлсетов
		this.view = { x: 0, y: 0, w: 416, h: 352 }; //Видимая часть
	}
	// отрисовка карты в контексте канваса
	draw(ctx) {
		if (!this.loaded)
			return;
		for (let i = 0; i < this.tLayer.data.length; i++) { // проходим по всей карте
			if (this.tLayer.data[i] !== 0) { // если данных нет, то пропускаем
				let tile = this.getTile(this.tLayer.data[i]); // получение блока по индексу
				let pX = (i % this.xCount) * this.tSize.x; // вычисляем x в пикселях
				let pY = Math.floor(i / this.xCount) * this.tSize.y;
				ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y); //отрисовка в контексте
			}
		}
	}

	isFree(x, y) {
		let tx = Math.floor(x / 32),
			ty = Math.floor(y / 32);
		return !(this.tLayer.data[tx + this.xCount * ty] == 29) && 0 <= tx && tx < 13 && 0 <= ty && ty < 11 && objectManager.objectInPos(x, y) == null;
	}
	isExit(x, y) {
		let tx = Math.floor(x / 32),
			ty = Math.floor(y / 32);
		return this.tLayer.data[tx + this.xCount * ty] == 4;
	}

	getTile(tileIndex) {
		let tile = {
			img: null, // изображение tileset
			px: 0, py: 0 // координаты блока в tileset
		};
		let tileset = this.getTileset(tileIndex);
		tile.img = tileset.image; // изображение искомого tileset
		let id = tileIndex - tileset.firstgid; // индекс блока в tileset
		// блок прямоугольный, остаток от деления на xCount дает х в tileset
		let x = id % tileset.xCount;
		let y = Math.floor(id / tileset.xCount);
		tile.px = x * this.tSize.x;
		tile.py = y * this.tSize.y;
		return tile; // возвращаем тайл для отображения
	}

	getTileset(tileIndex) {
		for (let i = this.tilesets.length - 1; i >= 0; i--) {
			// в каждом tilesets[i].firstgid записано число, с которого начинается нумерация блоков
			if (this.tilesets[i].firstgid <= tileIndex) {
				// если индекс первого блока меньше, либо равен искомому, значит этот tileset и нужен
				return this.tilesets[i];
			}
		}
		return null;
	}

	load(file) {
		this.loaded = false;
		getReq(file, (req) => {
			mapManager.parseMap(req.response);
			mapManager.parseEntities();
			for (let id = 0; id < mapManager.mapData.layers.length; id++) {
				// проходим по всем layer карты
				let layer = mapManager.mapData.layers[id];
				if (layer.type === "tilelayer") {
					mapManager.tLayer = layer;
					//break;
				}
			}
			mapManager.loaded = true;
		})
	}

	//Разбираем карту
	parseMap(tilesJSON) {
		this.mapData = JSON.parse(tilesJSON);
		//разобрать JSON
		this.xCount = this.mapData.width; // сохранение ширины
		this.yCount = this.mapData.height; // сохранение высоты
		this.tSize.x = this.mapData.tilewidth; // сохранение размера тайла
		this.tSize.y = this.mapData.tileheight; // сохранение размера тайла
		this.mapSize.x = this.xCount * this.tSize.x; // вычисление размера карты
		this.mapSize.y = this.yCount * this.tSize.y;
		for (let i = 0; i < this.mapData.tilesets.length; i++) {
			let img = new Image(); // создаем переменную для хранения изображений
			img.onload = function () { // при загрузке изображения
				mapManager.imgLoadCount++;
				if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
					mapManager.imgLoaded = true; // загружены все изображения
				}
			};
			img.src = this.mapData.tilesets[i].image; // задание пути к изображению
			let t = this.mapData.tilesets[i]; //забираем tileset из карты
			let ts = { // создаем свой объект tileset
				firstgid: t.firstgid, // с него начинается нумерация в data
				image: img,
				name: t.name, // имя элемента рисунка
				xCount: Math.floor(t.imagewidth / this.tSize.x), // горизонталь
				yCount: Math.floor(t.imageheight / this.tSize.y) // вертикаль
			}; // конец объявления ts
			this.tilesets.push(ts); // сохраняем tileset в массив
		} // окончание цикла for
		this.jsonLoaded = true; // когда разобран весь json
	}
	//Разбирает слой объектов
	parseEntities() {
		let countEnemies = 0;
		for (let j = 0; j < this.mapData.layers.length; j++) // просмотр всех слоев
			if (this.mapData.layers[j].type === 'objectgroup') {
				let entities = this.mapData.layers[j]; // слой с объектами следует разобрать
				for (let i = 0; i < entities.objects.length; i++) { //Просматриваем все объекты
					let e = entities.objects[i]; //Получает объект
					let obj = null;

					if (e.name == "Player") {
						obj = new Player({ x: e.x, y: e.y });
						gameManager.player = obj;
					} else if (e.name == "Enemy") {
						countEnemies++;
						obj = new Enemy({ x: e.x, y: e.y }, 1, countEnemies);
					}

					if (obj) {
						objectManager.addObject(obj);
					}
				}
			}
	}
}
