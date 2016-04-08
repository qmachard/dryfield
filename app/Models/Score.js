import EventEmitter from '../Core/EventEmitter.js';

export default class Score extends EventEmitter {
	constructor() {
		super();

		this.score = 0;
		this.level = 1;
	}

	increment() {
		this.score += 1;

		if(this.score % 5) {
			this.level++;
			this.emit('nextLevel');
		}

		this.emit('update');
	}

	reset() {
		this.score = 0;

		this.emit('update');
	}
}