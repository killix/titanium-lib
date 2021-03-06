// TODO: Add "requires" to all libs, check this while loading

var lib = function() {
	var self = {
		incPath: 'lib/',
		libSets: {
			all: [
				'audio',
				'config',
				'debug',
				'net',
				'phpjs',
				'profile',
				'rotate',
				'system',
				'tools',
				'UI',
				'window'
			]
		}
	};

	self.loadLib = function(libName) {
		self[libName] = require(self.incPath+libName);
	}

	self.load = function(libs, incPath) {
		if(typeof(libs)=='undefined') {
			libs = 'all';
		}

		if(typeof(libs)=='string' && typeof(self.libSets[libs])!='undefined') {
			libs = self.libSets[libs];
		}

		if(incPath) {
			self.incPath = incPath;
		}

		if(typeof(libs)=='object') {
			for(var i in libs) {
				self.loadLib(libs[i]);
			}
		}
	};

	return self;
};

module.exports = lib();
