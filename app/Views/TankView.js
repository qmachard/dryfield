export default class TankView {
	constructor(tank) {
		this.tank = tank;

		this.tankDiv = document.getElementById('tank');

		this.init();
		this.initEvents();
	}

	init() {
		this.updateQuantity();
	}

	initEvents() {
		this.tank.on('update', () => {
			this.updateQuantity();
		});
	}

	updateQuantity() {
		this.tankDiv.innerHTML = this.tank.quantity;
	}
}