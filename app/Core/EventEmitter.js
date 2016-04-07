/**
 * Created by quentinmachard on 07/04/2016.
 */
export default class EventEmitter {
	constructor() {
		this.events = [];
	}

	/**
	 * Listen event
	 * @param eventName
	 * @param fn
	 */
	on(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	}

	/**
	 * Stop listen event
	 *
	 * @param eventName
	 * @param fn
	 */
	off(eventName, fn) {
		let idx = this.events[eventName].indexOf(fn);
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
	emit(eventName, data) {
		if (this.events[eventName]) {
			this.events[eventName].forEach(function(fn) {
				fn(data);
			});
		}
	}
}