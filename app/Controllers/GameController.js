import Wallet from '../Models/Wallet.js';
import WalletView from '../Views/WalletView.js';

import Tank	from '../Models/Tank.js';
import TankView	from '../Views/TankView.js';

import Field from '../Models/Field.js';
import FieldView from '../Views/FieldView.js';

import Score from '../Models/Score.js';
import ScoreView from '../Views/ScoreView.js';

export default class GameController {
	constructor(config) {

		this.config = Object.assign({
			wallet: {
				initialAmount: 50
			},
			tank:{
				initialQuantity: 3,
				size: 6,
				waterPrice: 1,
				waterGradient: 1
			},
			field: {
				waterConsumption: 1,
				harvestIncrement: 5,
				harvestPrice: 40,
				tank: {
					initialQuantity: 3,
					size: 3
				}
			},
			nbFields: 3
		}, config);

		this.wallet = new Wallet(this.config.wallet);
		this.walletView = new WalletView(this.wallet);

		this.tank = new Tank(this.config.tank);
		this.tankView = new TankView(this.tank);

		this.score = new Score();
		this.scoreView = new ScoreView(this.score);

		this.fields = [];
		this.fieldsView = [];

		this.init();
	}

	init() {
		this.tankView.on('buy', () => {
			var lack = this.tank.getLack();
			var quantity = this.config.tank.waterGradient;

			if(lack < quantity) {
				quantity = lack;
			}

			if(quantity > 0) {
				var price = this.config.tank.waterPrice * quantity;

				if(!this.wallet.canPay(price)) {
					quantity = this.wallet.amount / this.config.tank.waterPrice;
					price = this.wallet.amount;
				}

				if(quantity > 0) {
					this.wallet.pay(price);
					this.tank.addWater(quantity);
				}
			}
		});

		this.score.on('nextLevel', () => {
			this.nextLevel();
		});

		this.initFields(this.config.nbFields);

		this.frames = setInterval(() => { this.frame() }, 1000);
	}

	frame() {
		for(var i=0, field; field = this.fields[i]; i++) {
			field.grow();
		}
	}

	nextLevel() {
		for(var i=0, field; field = this.fields[i]; i++) {
			field.config.waterConsumption += .5;
			field.config.harvestPrice += 5;
		}
	}

	initFields(nbFields) {
		for(var i=0; i<nbFields; i++) {
			let field = new Field(this.config.field);
			let fieldView = new FieldView(field, 'field-' + i);

			fieldView.on('irrigate', () => {
				field.tank.addWaterFrom(this.tank);
			});

			fieldView.on('harvest', () => {
				var amount = field.harvest();
				this.wallet.getPaid(amount);

				if(amount > 0) {
					this.score.increment();
				}
			});

			this.fields.push(field);
			this.fieldsView.push(fieldView);
		}
	}
}