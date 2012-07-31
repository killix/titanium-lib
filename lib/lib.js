// TODO: Add "requires" to all libs, check this while loading

var lib = function() {
	var self = {
		incPath: 'lib/'
	};

	self.loadLib = function(libName) {
		self[libName] = require(self.incPath+libName);
	}

	self.load = function(libs, incPath) {
		if(incPath) {
			self.incPath = incPath;
		}

		for(var i in libs) {
			self.loadLib(libs[i]);
		}
	};

	return self;
};

module.exports = lib();
