var Class = require('./class');

module.exports = Class.extend({
	id: null,
	name: null,
	games: null,
	MAX_GAMES: 5,
	init: function(name) {
		this.id = utils.uuid();
		this.name = name;
		this.games = []; //ids
	},
	join: function(gameID) {
		this.games.push(gameID);
	}
});