/**
 * Created by quentinmachard on 06/04/2016.
 */
export default class WalletView {
	constructor(wallet) {
		this.wallet = wallet;

		this.walletDiv = document.getElementById('wallet');

		this.init();
		this.initEvents();
	}

	init() {
		this.updateAmount();
	}

	initEvents() {
		this.wallet.on('update', () => {
			this.updateAmount();
		});
	}

	updateAmount() {
		this.walletDiv.innerHTML = this.wallet.amount;
	}
}