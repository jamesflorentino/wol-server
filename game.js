var Class = require('./class');

module.exports = Class.extend({
	id: null,
	players: null,
	MAX_PLAYERS: 2,
	init: function() {
		this.id = utils.uuid();
		this.players = [];
	},
	join: function(player) {
		if (this.players.length < this.MAX_PLAYERS) {
			this.players.push(player);
		}
	}
});