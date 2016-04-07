import EventEmitter from '../Core/EventEmitter.js';

export default class ScoreView extends EventEmitter  {
	constructor(score) {
		super();

		this.score = score;

		this.scoreDiv = document.getElementById('score');
		this.valueDiv = this.scoreDiv.querySelector('.value');

		this.init();
		this.initEvents();
	}

	init() {
		this.updateValue();
	}

	initEvents() {
		this.score.on('update', () => {
			this.updateValue();
		});
	}

	updateValue() {
		this.valueDiv.innerHTML = this.score.score;
	}
}