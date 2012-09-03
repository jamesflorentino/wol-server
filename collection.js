var Class = require('./class');

module.exports = Class.extend({
	init: function() {
		this.list = [];
		this._dictionary = {};
	},
	add: function(model) {
		this.list.push(model);
		this._dictionary[model.id] = model;
		return this;
	},
	remove: function(model) {
		var index, id;
		id = model.id;
		index = this.list.indexOf(model);
		delete this._dictionary[id];
		return this;
	},
	get: function(id) {
		return this._dictionary[id];
	}
});