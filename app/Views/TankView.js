import EventEmitter from '../Core/EventEmitter.js';

export default class TankView extends EventEmitter {
	constructor(tank) {
		super();

		this.tank = tank;

		this.tankDiv = document.getElementById('tank');

		this.quantityDiv = this.tankDiv.querySelector('.quantity');
		this.buyBtn = this.tankDiv.querySelector('.btn-buy');

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

		this.buyBtn.addEventListener('click', ()=>{
			this.emit('buy');
		}, false);
	}

	updateQuantity() {
		this.quantityDiv.innerHTML = this.tank.quantity;
	}
}