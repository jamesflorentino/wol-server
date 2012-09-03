module.exports = {
	uuid: function(length) {
		length || (length = 12);
		var ret = "";
		while (ret < length)
		ret += Math.random().toString(16).substring(2);
		return ret.substring(0, length);
	}
};