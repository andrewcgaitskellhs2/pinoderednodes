module.exports = function(RED) {
	const util = require('util');

	function ListOfSheetsNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			var msgfile = msg.payload;
			msg.payload.sheets = msg.payload.SheetNames;
			//msg.payload.msgfile = msgfile;
			node.send(msg);
		});
	}
	RED.nodes.registerType("list-of-sheets",ListOfSheetsNode);
}
