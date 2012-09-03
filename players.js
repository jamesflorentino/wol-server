var Collection = require('./collection');

module.exports = Collection.extend({
	init: function() {
		this._super();
		this._authKeys = {};
	},
	add: function(model) {
		this._super();
		this._authKeys[model.id] = model;
	},
	remove: function(model) {
		this._super();
		delete this._authKeys[model.id];
	},
	getByAuthKey: function(authKey) {
		return this._authKeys[authKey];
	}
})