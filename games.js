var Collection = require('./collection');

module.exports = Collection.extend({
	init: function() {
		this._super();
		this._available = []; // list of gameID(s)
	},
	getAvailable: function() {
		return this._available[0];
	},
	add: function(game) {
		this._super();
		this._available.push(game.id);
	}
})