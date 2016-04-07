import EventEmitter from '../Core/EventEmitter.js';

export default class Tank extends EventEmitter {
	constructor(initialQuantity, size) {
		super();

		this.quantity = initialQuantity;
		this.size = size || 10;
	}

	deliver(quantity) {
		if(this.quantity < quantity) {
			quantity = this.quantity;
		}

		this.quantity = Math.roundDecimal(this.quantity - quantity, 2);

		// Events
		this.emit('deliver', quantity);
		this.emit('update');

		return quantity;
	}

	takeDelivery(quantity) {
		if(this.quantity + quantity > this.size) {
			quantity = this.size - this.quantity;
		}

		this.quantity = Math.roundDecimal(this.quantity + quantity, 2);

		// Events
		this.emit('takeDelivery', quantity);
		this.emit('update');

		return quantity;
	}
}