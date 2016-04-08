import EventEmitter from '../Core/EventEmitter.js';

export default class TankView extends EventEmitter {
	constructor(tank) {
		super();

		this.tank = tank;

		this.tankDiv = document.getElementById('tank');

		this.quantityDiv = this.tankDiv.querySelector('.quantity');
		this.sizeDiv = this.tankDiv.querySelector('.size');
		this.buyBtn = this.tankDiv.querySelector('.btn-buy');

		this.init();
		this.initEvents();
	}

	init() {
		this.updateQuantity();
		this.updateSize();
	}

	initEvents() {
		this.tank.on('update', () => {
			this.updateQuantity();
		});

		this.buyBtn.addEventListener('click', () => {
			this.emit('buy');
		}, false);
	}

	updateSize() {
		this.sizeDiv.innerHTML = this.tank.size;
	}

	updateQuantity() {
		this.tankDiv.querySelector('.square_progress').style.height = this.tank.quantity / this.tank.size * 100 + '%';
		this.quantityDiv.innerHTML = this.tank.quantity;
	}
}