var windowLib = function() {
	var self = {
		incPath: 'ui/',
		classes: {},
		windows: {},
		openWindows: [],
		
		appWindow: null,
		navGroup: null,
	};

	self.load = function(incPath, firstWindow, preloadWindows) {
		// Init path
		if(incPath) {
			self.incPath = incPath;
		}
		
		// Create app window
		self.appWindow = Ti.UI.createWindow({
			backgroundColor: Ti.UI.getBackgroundColor()
		});
		
		// Load first window
		self.loadWindow(firstWindow);

		// Preload
		if(typeof(preloadWindows)=='object' || typeof(preloadWindows)=='array') {
			self.loadWindow(preloadWindows);
		}

		// Create navgroup
		self.navGroup = Ti.UI.iPhone.createNavigationGroup({
			top: -44, // Hide title bar
			window: self.windows[firstWindow]
		});
		self.appWindow.add(self.navGroup);
		self.appWindow.open();

		// Add events
		Ti.addEventListener('openWindow', function(e) {
			self.open(e.windowName, e);
		});

		Ti.addEventListener('closeWindow', function(e) {
			self.close(e.windowName);
		});

		Ti.addEventListener('closeLastWindow', function(e) {
			self.closeLast();
		});

		Ti.addEventListener('closeAllWindows', function(e) {
			self.closeAll();
		});
	};

	self.loadWindow = function(windowName) {
		if(typeof(windowName)=='object' || typeof(windowName)=='array') {
			for(var i in windowName) {
				self.loadWindow(windowName[i]);
			}
		} else {
			if(!lib.phpjs.array_key_exists(windowName, self.classes)) {
				lib.tools.log('lib.window.loadWindow '+windowName);
				self.classes[windowName] = require(self.incPath+windowName);
				self.windows[windowName] = self.classes[windowName]();
			}
		}
	};

	self.open = function(windowName, options) {
		if(typeof(options)!='object') {
			options = {};
		}
		if(!lib.phpjs.in_array(windowName, self.openWindows)) {
			lib.tools.log('lib.window.open '+windowName);
			self.appWindow.startLayout();
			self.loadWindow(windowName);

			if(typeof(self.windows[windowName].beforeOpen)=='function') {
				lib.tools.log('lib.window.open window.beforeOpen()');
				self.windows[windowName].beforeOpen();
			}

			if(typeof(options.beforeOpen)=='function') {
				lib.tools.log('lib.window.open options.beforeOpen()');
				options.beforeOpen(self.windows[windowName]);
			}

			self.navGroup.open(self.windows[windowName]);
			self.openWindows.push(windowName);

			if(typeof(options.afterOpen)=='function') {
				lib.tools.log('lib.window.open options.afterOpen()');
				options.afterOpen(self.windows[windowName]);
			}

			if(typeof(self.windows[windowName].afterOpen)=='function') {
				lib.tools.log('lib.window.open window.afterOpen()');
				self.windows[windowName].afterOpen();
			}

			self.appWindow.finishLayout();
		}
		lib.tools.log('lib.system.open OPEN WINDOWS: '+self.openWindows.join(' > '));
	};

	self.close = function(windowName) {
		if(lib.phpjs.in_array(windowName, self.openWindows)) {
			lib.tools.log('lib.window.close '+windowName);
			self.navGroup.close(self.windows[windowName]);
			self.openWindows.splice(self.openWindows.indexOf(windowName), 1); // Remove from self.openWindows
		}
		lib.tools.log('lib.system.close OPEN WINDOWS: '+self.openWindows.join(' > '));
	}

	self.closeLast = function() {
		if(self.openWindows.length>0) {
			self.close(self.openWindows[self.openWindows.length-1]);
		}
	};

	self.closeAll = function() {
		// TODO: Manchmal wird das erste Fenster nicht geschlossen!
		lib.tools.log('lib.window.closeAll: '+self.openWindows.join(' > '));
		if(self.openWindows.length>0) {
			for(var i=self.openWindows.length-1; i>=0; i--) {
				self.close(self.openWindows[i]);
			}
		}
	}

	return self;
};

module.exports = windowLib();