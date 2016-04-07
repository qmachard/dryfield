import EventEmitter from '../Core/EventEmitter.js';
import Tank from './Tank.js';

export default class Field extends EventEmitter {
	constructor(config) {
		super();

		this.config = Object.assign({
			waterConsumption: 1,
			harvestIncrement: 5,
			harvestPrice: 10,
			harvestMaturity: 100
		}, config);

		this.harvestLevel = 0;
		this.tank = new Tank(this.config.tank);
	}

	grow() {
		if(this.tank.hasWater(this.config.waterConsumption) && this.harvestLevel < this.config.harvestMaturity) {
			this.tank.getWater(this.config.waterConsumption);
			this.harvestLevel = Math.roundDecimal(this.harvestLevel + this.config.harvestIncrement, 2);

			this.emit('grow');
			this.emit('update');

			this.checkMaturity();
		}
	}

	harvest() {
		if(this.checkMaturity()) {
			this.harvestLevel = 0;
			this.emit('reset');
			return 40;
		}
		return 0;
	}

	checkMaturity() {
		if(this.harvestLevel == this.config.harvestMaturity) {
			this.emit('isMature');
			return true;
		}
		return false;
	}
}