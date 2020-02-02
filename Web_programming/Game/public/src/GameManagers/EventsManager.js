class EventsManager {
	constructor() {
		this.events = [];
		document.body.addEventListener("keydown", this.onKeyDown);
		document.body.addEventListener("keyup", this.onKeyUp);
	}
	//При нажатии кнопки
	onKeyDown(event) {
		eventsManager.events.push(event.keyCode) // Can't use 'this' because it's callback function
	}
	popEvent() {
		let event = this.events.pop();
		if (event)
			return event;
		return null;
	}
};