var debug = function() {
	var self = {};
	
	self.tools = [
		{title: 'App Version', fn: function() {
			alert('Version: '+lib.config.get('version'));
		}},
		{title: 'Show Log', fn: function() {
			alert(lib.tools.logText);
		}},
		{title: 'Fire Event', fn: function() {
			lib.UI.prompt('Enter event name:', function(text) {
				alert('Firing event "'+text+'"');
				Ti.fireEvent(text);
			});
		}}
	];
	
	self.openDialog = function() {
		var dialogOptions = [];
		for(var dt in self.tools) {
			dialogOptions.push(self.tools[dt].title);
		}
		dialogOptions.push('Close');

		var dialog = Ti.UI.createOptionDialog({
			// title: 'Debugging',
			options: dialogOptions,
			destructive: dialogOptions.length-1
		});

		dialog.addEventListener('click', function(e) {
			if(typeof(e.index)!='undefined' && typeof(self.tools[e.index])=='object' && typeof(self.tools[e.index].fn)=='function') {
				self.tools[e.index].fn();
			}
		});
		dialog.show();
	}
	
	// TODO: Function to dynamically change stuff
	// self.debugValue = function(fn) {
	// 	 
	// }
	
	return self;
}

module.exports = debug();
