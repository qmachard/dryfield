/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Volumes/Donnees/IMIE/Cours/woa/dryfield/DryField/public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _GameController = __webpack_require__(1);
	
	var _GameController2 = _interopRequireDefault(_GameController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = {
		wallet: {
			initialAmount: 50
		},
		tank: {
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
	}; /**
	    * Created by quentinmachard on 06/04/2016.
	    */
	
	
	Math.roundDecimal = function (number, decimals) {
		var multiplier = decimals > 0 ? 10 * decimals : 1;
		return this.round(number * multiplier) / multiplier;
	};
	
	var gameController = new _GameController2.default(config);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Wallet = __webpack_require__(2);
	
	var _Wallet2 = _interopRequireDefault(_Wallet);
	
	var _WalletView = __webpack_require__(4);
	
	var _WalletView2 = _interopRequireDefault(_WalletView);
	
	var _Tank = __webpack_require__(5);
	
	var _Tank2 = _interopRequireDefault(_Tank);
	
	var _TankView = __webpack_require__(6);
	
	var _TankView2 = _interopRequireDefault(_TankView);
	
	var _Field = __webpack_require__(7);
	
	var _Field2 = _interopRequireDefault(_Field);
	
	var _FieldView = __webpack_require__(8);
	
	var _FieldView2 = _interopRequireDefault(_FieldView);
	
	var _Score = __webpack_require__(9);
	
	var _Score2 = _interopRequireDefault(_Score);
	
	var _ScoreView = __webpack_require__(10);
	
	var _ScoreView2 = _interopRequireDefault(_ScoreView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameController = function () {
		function GameController(config) {
			_classCallCheck(this, GameController);
	
			this.config = Object.assign({
				wallet: {
					initialAmount: 50
				},
				tank: {
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
	
			this.wallet = new _Wallet2.default(this.config.wallet);
			this.walletView = new _WalletView2.default(this.wallet);
	
			this.tank = new _Tank2.default(this.config.tank);
			this.tankView = new _TankView2.default(this.tank);
	
			this.score = new _Score2.default();
			this.scoreView = new _ScoreView2.default(this.score);
	
			this.fields = [];
			this.fieldsView = [];
	
			this.init();
		}
	
		_createClass(GameController, [{
			key: 'init',
			value: function init() {
				var _this = this;
	
				this.tankView.on('buy', function () {
					var lack = _this.tank.getLack();
					var quantity = _this.config.tank.waterGradient;
	
					if (lack < quantity) {
						quantity = lack;
					}
	
					if (quantity > 0) {
						var price = _this.config.tank.waterPrice * quantity;
	
						if (!_this.wallet.canPay(price)) {
							quantity = _this.wallet.amount / _this.config.tank.waterPrice;
							price = _this.wallet.amount;
						}
	
						if (quantity > 0) {
							_this.wallet.pay(price);
							_this.tank.addWater(quantity);
						}
					}
				});
	
				this.score.on('nextLevel', function () {
					_this.nextLevel();
				});
	
				this.initFields(this.config.nbFields);
	
				this.frames = setInterval(function () {
					_this.frame();
				}, 1000);
			}
		}, {
			key: 'frame',
			value: function frame() {
				for (var i = 0, field; field = this.fields[i]; i++) {
					field.grow();
				}
			}
		}, {
			key: 'nextLevel',
			value: function nextLevel() {
				for (var i = 0, field; field = this.fields[i]; i++) {
					field.config.waterConsumption += .5;
					field.config.harvestPrice += 5;
				}
			}
		}, {
			key: 'initFields',
			value: function initFields(nbFields) {
				var _this2 = this;
	
				var _loop = function _loop() {
					var field = new _Field2.default(_this2.config.field);
					var fieldView = new _FieldView2.default(field, 'field-' + i);
	
					fieldView.on('irrigate', function () {
						field.tank.addWaterFrom(_this2.tank);
					});
	
					fieldView.on('harvest', function () {
						var amount = field.harvest();
						_this2.wallet.getPaid(amount);
	
						if (amount > 0) {
							_this2.score.increment();
						}
					});
	
					_this2.fields.push(field);
					_this2.fieldsView.push(fieldView);
				};
	
				for (var i = 0; i < nbFields; i++) {
					_loop();
				}
			}
		}]);
	
		return GameController;
	}();

	exports.default = GameController;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by quentinmachard on 06/04/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var Wallet = function (_EventEmitter) {
		_inherits(Wallet, _EventEmitter);
	
		function Wallet(config) {
			_classCallCheck(this, Wallet);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wallet).call(this));
	
			_this.config = Object.assign({
				initialAmount: 50
			}, config);
	
			_this.amount = _this.config.initialAmount;
			return _this;
		}
	
		/**
	  * Method to pay
	  * @param amount
	  * @returns {boolean}
	  */
	
	
		_createClass(Wallet, [{
			key: 'pay',
			value: function pay(amount) {
				if (this.canPay(amount)) {
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
	
		}, {
			key: 'getPaid',
			value: function getPaid(amount) {
				this.amount += amount;
	
				this.emit('update');
			}
	
			/**
	   *
	   * @param amount
	   * @returns {boolean}
	   */
	
		}, {
			key: 'canPay',
			value: function canPay(amount) {
				return this.amount >= amount;
			}
		}]);
	
		return Wallet;
	}(_EventEmitter3.default);

	exports.default = Wallet;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by quentinmachard on 07/04/2016.
	 */
	
	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);
	
			this.events = [];
		}
	
		/**
	  * Listen event
	  * @param eventName
	  * @param fn
	  */
	
	
		_createClass(EventEmitter, [{
			key: "on",
			value: function on(eventName, fn) {
				this.events[eventName] = this.events[eventName] || [];
				this.events[eventName].push(fn);
			}
	
			/**
	   * Stop listen event
	   *
	   * @param eventName
	   * @param fn
	   */
	
		}, {
			key: "off",
			value: function off(eventName, fn) {
				var idx = this.events[eventName].indexOf(fn);
				if (idx !== -1) {
					this.events[eventName].splice(idx, 1);
				}
			}
	
			/**
	   * Bind event
	   *
	   * @param eventName
	   * @param data
	   */
	
		}, {
			key: "emit",
			value: function emit(eventName, data) {
				if (this.events[eventName]) {
					this.events[eventName].forEach(function (fn) {
						fn(data);
					});
				}
			}
		}]);
	
		return EventEmitter;
	}();

	exports.default = EventEmitter;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by quentinmachard on 06/04/2016.
	 */
	
	var WalletView = function () {
		function WalletView(wallet) {
			_classCallCheck(this, WalletView);
	
			this.wallet = wallet;
	
			this.walletDiv = document.getElementById('wallet');
	
			this.walletAmountDiv = this.walletDiv.querySelector('.amount');
	
			this.init();
			this.initEvents();
		}
	
		_createClass(WalletView, [{
			key: 'init',
			value: function init() {
				this.updateAmount();
			}
		}, {
			key: 'initEvents',
			value: function initEvents() {
				var _this = this;
	
				this.wallet.on('update', function () {
					_this.updateAmount();
				});
			}
		}, {
			key: 'updateAmount',
			value: function updateAmount() {
				this.walletAmountDiv.innerHTML = this.wallet.amount;
			}
		}]);
	
		return WalletView;
	}();

	exports.default = WalletView;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tank = function (_EventEmitter) {
		_inherits(Tank, _EventEmitter);
	
		function Tank(config) {
			_classCallCheck(this, Tank);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tank).call(this));
	
			_this.config = Object.assign({
				initialQuantity: 3,
				size: 10,
				waterPrice: 1
			}, config);
	
			_this.quantity = _this.config.initialQuantity;
			_this.size = _this.config.size;
			return _this;
		}
	
		_createClass(Tank, [{
			key: 'getWater',
			value: function getWater(quantity, canDeliverLess) {
				if (this.quantity < quantity) {
					quantity = 0;
	
					if (canDeliverLess) {
						quantity = this.quantity;
					}
	
					this.emit('nowater');
				}
	
				this.quantity = Math.roundDecimal(this.quantity - quantity, 2);
	
				// Events
				this.emit('deliver', quantity);
				this.emit('update');
	
				return quantity;
			}
		}, {
			key: 'addWater',
			value: function addWater(quantity) {
				if (this.canAddWater(quantity)) {
					this.quantity = Math.roundDecimal(this.quantity + quantity, 2);
	
					// Events
					this.emit('takeDelivery', quantity);
					this.emit('update');
	
					return quantity;
				}
	
				return 0;
			}
		}, {
			key: 'addWaterFrom',
			value: function addWaterFrom(tank) {
				var lack = this.getLack();
	
				if (lack > 0) {
					var water = tank.getWater(lack, true);
					this.addWater(water);
				}
			}
		}, {
			key: 'canAddWater',
			value: function canAddWater(quantity) {
				return this.quantity + quantity <= this.size;
			}
		}, {
			key: 'hasWater',
			value: function hasWater(quantity) {
				return this.quantity >= quantity;
			}
		}, {
			key: 'getLack',
			value: function getLack() {
				return this.size - this.quantity;
			}
		}]);
	
		return Tank;
	}(_EventEmitter3.default);

	exports.default = Tank;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TankView = function (_EventEmitter) {
		_inherits(TankView, _EventEmitter);
	
		function TankView(tank) {
			_classCallCheck(this, TankView);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TankView).call(this));
	
			_this.tank = tank;
	
			_this.tankDiv = document.getElementById('tank');
	
			_this.quantityDiv = _this.tankDiv.querySelector('.quantity');
			_this.sizeDiv = _this.tankDiv.querySelector('.size');
			_this.buyBtn = _this.tankDiv.querySelector('.btn-buy');
	
			_this.init();
			_this.initEvents();
			return _this;
		}
	
		_createClass(TankView, [{
			key: 'init',
			value: function init() {
				this.updateQuantity();
				this.updateSize();
			}
		}, {
			key: 'initEvents',
			value: function initEvents() {
				var _this2 = this;
	
				this.tank.on('update', function () {
					_this2.updateQuantity();
				});
	
				this.buyBtn.addEventListener('click', function () {
					_this2.emit('buy');
				}, false);
			}
		}, {
			key: 'updateSize',
			value: function updateSize() {
				this.sizeDiv.innerHTML = this.tank.size;
			}
		}, {
			key: 'updateQuantity',
			value: function updateQuantity() {
				this.tankDiv.querySelector('.square_progress').style.height = this.tank.quantity / this.tank.size * 100 + '%';
				this.quantityDiv.innerHTML = this.tank.quantity;
			}
		}]);
	
		return TankView;
	}(_EventEmitter3.default);

	exports.default = TankView;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	var _Tank = __webpack_require__(5);
	
	var _Tank2 = _interopRequireDefault(_Tank);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Field = function (_EventEmitter) {
		_inherits(Field, _EventEmitter);
	
		function Field(config) {
			_classCallCheck(this, Field);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this));
	
			_this.config = Object.assign({
				waterConsumption: 1,
				harvestIncrement: 5,
				harvestPrice: 10,
				harvestMaturity: 100
			}, config);
	
			_this.harvestLevel = 0;
			_this.tank = new _Tank2.default(_this.config.tank);
			return _this;
		}
	
		_createClass(Field, [{
			key: 'grow',
			value: function grow() {
				if (this.harvestLevel < this.config.harvestMaturity) {
					if (this.tank.hasWater(this.config.waterConsumption)) {
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
		}, {
			key: 'harvest',
			value: function harvest() {
				if (this.checkMaturity()) {
					this.reset();
	
					return this.config.harvestPrice;
				}
				return 0;
			}
		}, {
			key: 'checkMaturity',
			value: function checkMaturity() {
				if (this.harvestLevel == this.config.harvestMaturity) {
					this.emit('isMature');
					return true;
				}
				return false;
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.harvestLevel = 0;
				this.emit('reset');
				this.emit('update');
			}
		}]);
	
		return Field;
	}(_EventEmitter3.default);

	exports.default = Field;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FieldView = function (_EventEmitter) {
		_inherits(FieldView, _EventEmitter);
	
		function FieldView(field, id) {
			_classCallCheck(this, FieldView);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FieldView).call(this));
	
			_this.field = field;
	
			_this.fieldDiv = document.getElementById(id);
	
			_this.harvestButton = _this.fieldDiv.querySelector('.btn-harvest');
			_this.irrigateButton = _this.fieldDiv.querySelector('.btn-irrigate');
	
			_this.init();
			_this.initEvents();
			return _this;
		}
	
		_createClass(FieldView, [{
			key: 'init',
			value: function init() {
				this.updateHarvest();
				this.updateTank();
			}
		}, {
			key: 'initEvents',
			value: function initEvents() {
				var _this2 = this;
	
				this.field.on('update', function () {
					_this2.updateHarvest();
					_this2.updateTank();
				});
	
				this.field.tank.on('update', function () {
					_this2.updateTank();
				});
	
				this.field.on('isMature', function () {
					_this2.harvestButton.removeAttribute('disabled');
				});
	
				this.field.on('reset', function () {
					_this2.harvestButton.setAttribute('disabled', true);
				});
	
				this.harvestButton.addEventListener('click', function () {
					_this2.emit('harvest');
				}, false);
	
				this.irrigateButton.addEventListener('click', function () {
					_this2.emit('irrigate');
				}, false);
			}
		}, {
			key: 'updateHarvest',
			value: function updateHarvest() {
				this.harvestButton.querySelector('.field-button_progress').style.height = this.field.harvestLevel / this.field.config.harvestMaturity * 100 + '%';
			}
		}, {
			key: 'updateTank',
			value: function updateTank() {
				this.irrigateButton.querySelector('.field-button_progress').style.height = this.field.tank.quantity / this.field.tank.size * 100 + '%';
			}
		}]);
	
		return FieldView;
	}(_EventEmitter3.default);

	exports.default = FieldView;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Score = function (_EventEmitter) {
		_inherits(Score, _EventEmitter);
	
		function Score() {
			_classCallCheck(this, Score);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Score).call(this));
	
			_this.score = 0;
			_this.level = 1;
			return _this;
		}
	
		_createClass(Score, [{
			key: 'increment',
			value: function increment() {
				this.score += 1;
	
				if (this.score % 5 == 0) {
					this.level++;
					this.emit('nextLevel');
				}
	
				this.emit('update');
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.score = 0;
	
				this.emit('update');
			}
		}]);
	
		return Score;
	}(_EventEmitter3.default);

	exports.default = Score;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(3);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ScoreView = function (_EventEmitter) {
		_inherits(ScoreView, _EventEmitter);
	
		function ScoreView(score) {
			_classCallCheck(this, ScoreView);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScoreView).call(this));
	
			_this.score = score;
	
			_this.scoreDiv = document.getElementById('score');
			_this.valueDiv = _this.scoreDiv.querySelector('.value');
	
			_this.init();
			_this.initEvents();
			return _this;
		}
	
		_createClass(ScoreView, [{
			key: 'init',
			value: function init() {
				this.updateValue();
			}
		}, {
			key: 'initEvents',
			value: function initEvents() {
				var _this2 = this;
	
				this.score.on('update', function () {
					_this2.updateValue();
				});
			}
		}, {
			key: 'updateValue',
			value: function updateValue() {
				this.valueDiv.innerHTML = this.score.score;
			}
		}]);
	
		return ScoreView;
	}(_EventEmitter3.default);

	exports.default = ScoreView;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map