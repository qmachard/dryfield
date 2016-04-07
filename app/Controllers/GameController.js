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
			if(this.wallet.canPay(this.config.tank.waterPrice) && this.tank.canAddWater(this.config.tank.waterGradient)) {
				this.wallet.pay(this.config.tank.waterPrice);
				this.tank.addWater(this.config.tank.waterGradient);
			}
		});

		this.initFields(this.config.nbFields);

		this.frames = setInterval(() => { this.frame() }, 1000);
	}

	frame() {
		for(var i=0, field; field = this.fields[i]; i++) {
			field.grow();
		}
	}

	initFields(nbFields) {
		for(var i=0; i<nbFields; i++) {
			let field = new Field(this.config.field);
			let fieldView = new FieldView(field, 'field-' + i);

			fieldView.on('irrigate', () => {
				field.tank.addWaterFrom(tank);
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