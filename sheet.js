module.exports = function(RED) {
	const util = require('util');

	function SheetNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			msg.payload = msg.payload.Sheets[msg.payload];
			node.send(msg);
		});
	}
	RED.nodes.registerType("sheet",SheetNode);
}
