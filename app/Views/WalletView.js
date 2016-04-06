/**
 * Created by quentinmachard on 06/04/2016.
 */
export default class WalletView {
	constructor(wallet) {
		this.wallet = wallet;

		this.walletDiv = document.getElementById('wallet');

		this.update();
	}

	update() {
		this.walletDiv.innerHTML = this.wallet.amount;
	}
}