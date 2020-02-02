class SoundManager {
	constructor() {
		this.audios = {}; // звуковые эффекты
		this.context = new AudioContext(); // аудиоконтекст
		this.loading = 0; // Количество загружающихся в данный момент звуков
	}
	load(files) {
		for (let file of files) {
			getReq(file, (req) => {
				soundManager.context.decodeAudioData(req.response, function (buffer) {
					soundManager.audios[file] = buffer;
				});
			}, 'arraybuffer');
		}
	}

	play(file, looping = false) {
		let source = this.audios[file];
		if (!source)
			return false;
		let sound = this.context.createBufferSource();
		sound.buffer = source;
		sound.connect(this.context.destination);
		sound.loop = looping;
		sound.start(0);
		console.log(file);
		return true;
	}
	stopAll(){

	}
}