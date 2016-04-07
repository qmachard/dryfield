/**
 * Created by quentinmachard on 06/04/2016.
 */
import Wallet from './Models/Wallet.js';
import WalletView from './Views/WalletView.js';

var wallet = new Wallet(50);
var walletView = new WalletView(wallet);