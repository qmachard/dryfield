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
		if(this.harvestLevel < this.config.harvestMaturity) {
			if(this.tank.hasWater(this.config.waterConsumption)) {
				this.tank.getWater(this.config.waterConsumption);
				this.harvestLevel = Math.roundDecimal(this.harvestLevel + this.config.harvestIncrement, 2);

				this.emit('grow');
				this.emit('update');

				this.checkMaturity();
			} else {
				this.reset();
			}
		}
	}

	harvest() {
		if(this.checkMaturity()) {
			this.reset();

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

	reset() {
		this.harvestLevel = 0;
		this.emit('reset');
		this.emit('update');
	}
}