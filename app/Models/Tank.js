import EventEmitter from '../Core/EventEmitter.js';

export default class Tank extends EventEmitter {
	constructor(initialQuantity, size) {
		super();

		this.quantity = initialQuantity;
		this.size = size || 10;
	}

	getWater(quantity) {
		if(this.quantity < quantity) {
			this.emit('nowater');
			return false;
		}

		this.quantity = Math.roundDecimal(this.quantity - quantity, 2);

		// Events
		this.emit('deliver', quantity);
		this.emit('update');

		return true;
	}

	addWater(quantity) {
		if(this.quantity + quantity > this.size) {
			quantity = this.size - this.quantity;
		}

		this.quantity = Math.roundDecimal(this.quantity + quantity, 2);

		// Events
		this.emit('takeDelivery', quantity);
		this.emit('update');

		return quantity;
	}

	hasWater(quantity) {
		return this.quantity >= quantity;
	}
}