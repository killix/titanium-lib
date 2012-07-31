// requires lib.tools, lib.config

var system = function() {
	var self = {
		height: null,
		width: null,
		osname: null,
		version: null,
		deviceIdentification: null,
		previousRunVersion: null,
		isFirstRun: null,
	};

	self.load = function() {
		self.osname = Ti.Platform.osname;
		self.version = Ti.Platform.version;
		self.height = Ti.Platform.displayCaps.platformHeight;
		self.width = Ti.Platform.displayCaps.platformWidth;

		if(self.osname==='ipad') {
			self.platform = 'ios';
			self.form = 'tablet';
		} else if(self.osname==='android' && (self.width > 899 || self.height > 899)) {
			self.platform = 'android';
			self.form = 'tablet';
		} else if(self.osname==='android') {
			self.platform = 'android';
			self.form = 'handheld';
		} else {
			self.platform = 'ios';
			self.form = 'handheld';
		}

		self.deviceIdentification = lib.tools.getString('deviceIdentification', false);
		if(self.deviceIdentification==false) {
			self.deviceIdentification = Ti.Platform.createUUID();
			lib.tools.setString('deviceIdentification', self.deviceIdentification);
		}
		
		self.previousRunVersion = lib.tools.getString('previousRunVersion');
		lib.tools.setString('previousRunVersion', lib.config.get('version'));
		
		self.isFirstRun = lib.tools.getBool('firstRun', true);
		if(self.isFirstRun) {
			lib.tools.setBool('firstRun', false);
		}
	};

	self.firstRun = function(fn) {
		if(self.isFirstRun && typeof(fn)=='function') {
			fn();
		}
	};

	return self;
}

module.exports = system();