/**
 * Created by quentinmachard on 06/04/2016.
 */
import GameController from './Controllers/GameController.js';

var config = {
	wallet: {
		initialAmount: 50
	},
	tank:{
		initialQuantity: 10,
		size: 40,
		waterPrice: 1,
		waterGradient: 10
	},
	field: {
		waterConsumption: 1,
		harvestIncrement: 5,
		harvestPrice: 40,
		tank: {
			initialQuantity: 3,
			size: 10
		}
	}
};

Math.roundDecimal = function(number, decimals) {
	var multiplier = decimals > 0 ? 10 * decimals : 1;
	return this.round(number * multiplier) / multiplier;
};

var gameController = new GameController(config);