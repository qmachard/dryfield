/**
 * Created by quentinmachard on 06/04/2016.
 */
export default class Wallet {
	constructor(initialAmount) {
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
			return true;
		}
		return false;
	}

	/**
	 * Mathod to get paid
	 * @param amount
	 */
	getPaid(amount) {
		this.amount += amount;
	}
}