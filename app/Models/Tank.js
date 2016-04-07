import EventEmitter from '../Core/EventEmitter.js';

export default class Tank extends EventEmitter {
	constructor(initialQuantity) {
		this.quantity = initialQuantity;
		this.size = 6;

		this.init();
	}

	deliver(quantity) {
		if(this.quantity < quantity) {
			quantity = this.quantity;
		}

		this.quantity -= quantity;

		// Events
		this.emit('deliver', quantity);
		this.emit('update');

		return quantity;
	}

	takeDelivery(quantity) {
		if(this.quantity + quantity > this.size) {
			quantity = this.size - this.quantity;
		}

		this.quantity += quantity;

		// Events
		this.emit('takeDelivery', quantity);
		this.emit('update');

		return quantity;
	}

	init() {

	}
}