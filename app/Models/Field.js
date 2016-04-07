import EventEmitter from '../Core/EventEmitter.js';
import Tank from './Tank.js';

export default class Field extends EventEmitter {
	constructor() {
		super();

		this.config = {
			harvestMaturity: 100,
			harvestIncrement: 10,
			waterDecrement: .4
		};

		this.harvestLevel = 0;
		this.tank = new Tank(3, 3);
	}

	grow() {
		if(this.tank.getWater(this.config.waterDecrement) && this.harvestLevel < this.config.harvestMaturity) {
			this.harvestLevel = Math.roundDecimal(this.harvestLevel + this.config.harvestIncrement, 2);

			this.emit('grow');
			this.emit('update');

			this.checkMaturity();
		}
	}

	checkMaturity() {
		if(this.harvestLevel == this.config.harvestMaturity) {
			this.emit('isMature')
		}
	}
}