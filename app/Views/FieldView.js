export default class FieldView {
	constructor(field, id) {
		this.field = field;

		this.fieldDiv = document.getElementById(id);

		this.harvestDiv = this.fieldDiv.querySelector('.harvest');
		this.tankDiv = this.fieldDiv.querySelector('.quantity');

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
	}

	updateHarvest() {
		this.harvestDiv.innerHTML = this.field.harvestLevel;
	}

	updateTank() {
		this.tankDiv.innerHTML = this.field.tank.quantity;
	}
}