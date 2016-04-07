import EventEmitter from '../Core/EventEmitter.js';

export default class Score extends EventEmitter {
	constructor() {
		super();

		this.score = 0;
	}

	increment() {
		this.score += 1;

		this.emit('update');
	}

	reset() {
		this.score = 0;

		this.emit('update');
	}
}