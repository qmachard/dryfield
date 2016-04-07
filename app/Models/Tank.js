import EventEmitter from '../Core/EventEmitter.js';

export default class Tank extends EventEmitter {
	constructor(initialQuantity, size) {
		super();

		this.quantity = initialQuantity;
		this.size = size || 10;
	}

	getWater(quantity, canDeliverLess) {
		if(this.quantity < quantity) {
			quantity = 0;

			if(canDeliverLess) {
				quantity = this.quantity;
			}

			this.emit('nowater');
		}

		this.quantity = Math.roundDecimal(this.quantity - quantity, 2);

		// Events
		this.emit('deliver', quantity);
		this.emit('update');

		return quantity;
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

	addWaterFrom(tank) {
		var lack = this.size - this.quantity;

		if(lack > 0) {
			var water = tank.getWater(lack, true);
			this.addWater(water);
		}
	}

	hasWater(quantity) {
		return this.quantity >= quantity;
	}
}