/**
 * Created by quentinmachard on 06/04/2016.
 */
import EventEmitter from '../Core/EventEmitter.js';

export default class Wallet extends EventEmitter {
	constructor(initialAmount) {
		super();

		this.amount = initialAmount;
	}

	/**
	 * Method to pay
	 * @param amount
	 * @returns {boolean}
	 */
	pay(amount) {
		if(this.amount >= amount) {
			this.amount -= amount;

			this.emit('pay', true);
			this.emit('update');
			return true;
		}

		this.emit('pay', false);

		return false;
	}

	/**
	 * Mathod to get paid
	 * @param amount
	 */
	getPaid(amount) {
		this.amount += amount;

		this.emit('update');
	}
}