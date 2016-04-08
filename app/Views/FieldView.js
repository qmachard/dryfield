import EventEmitter from '../Core/EventEmitter.js';

export default class FieldView extends EventEmitter {
	constructor(field, id) {
		super();

		this.field = field;

		this.fieldDiv = document.getElementById(id);

		this.harvestButton = this.fieldDiv.querySelector('.btn-harvest');
		this.irrigateButton = this.fieldDiv.querySelector('.btn-irrigate');

		this.init();
		this.initEvents();
	}

	init() {
		this.updateHarvest();
		this.updateTank();
	}

	initEvents() {
		this.field.on('update', () => {
			this.updateHarvest();
			this.updateTank();
		});

		this.field.tank.on('update', () => {
			this.updateTank();
		});

		this.field.on('isMature', () => {
			this.harvestButton.removeAttribute('disabled');
		});

		this.field.on('reset', () => {
			this.harvestButton.setAttribute('disabled', true);
		});

		this.harvestButton.addEventListener('click', () => {
			this.emit('harvest');
		}, false);

		this.irrigateButton.addEventListener('click', () => {
			this.emit('irrigate');
		}, false);
	}

	updateHarvest() {
		this.harvestButton.querySelector('.field-button_progress').style.height = this.field.harvestLevel / this.field.config.harvestMaturity * 100 + '%';
	}

	updateTank() {
		this.irrigateButton.querySelector('.field-button_progress').style.height = this.field.tank.quantity / this.field.tank.size * 100 + '%';
	}
}