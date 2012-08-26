// requires lib.tools

var rotate = function() {
	var self = {
		height: null,
		width: null,
		orientation: 'portrait', // default
		orientationChangeEnabled: false,
		orientationchangeWaitPeriod: 750
	};

	self.load = function(enableEvents) {
		self.height = Ti.Platform.displayCaps.platformHeight;
		self.width = Ti.Platform.displayCaps.platformWidth;
		if(enableEvents) {
			self.enableEvents();
		}
	};

	self.getOrientation = function() {
		return self.orientation;
	}

	self.enableEvents = function() {
		if(self.width>self.height) {
			self.orientation = 'landscape';
		}
		self.lastOrientationChange = 0;
		self.newOrientation = self.orientation;
		Titanium.Gesture.addEventListener('orientationchange', function(e) {
			if(Titanium.Gesture.orientation==Titanium.UI.LANDSCAPE_LEFT || Titanium.Gesture.orientation==Titanium.UI.LANDSCAPE_RIGHT) {
				self.newOrientation = 'landscape';
			} else {
				self.newOrientation = 'portrait';
			}
			self.lastOrientationChange = +new Date;
			Ti.fireEvent('actualOrientationChange', {orientation: self.newOrientation});
			lib.tools.log('lib.rotate.orientationChangeEvents: actualOrientationChange '+self.newOrientation);
		});
		setInterval(function() {
			var now = +new Date;
			var changeDiff = now - self.lastOrientationChange;
			if(changeDiff>self.orientationchangeWaitPeriod && self.newOrientation!=self.orientation) {
				self.orientation = self.newOrientation;
				Ti.fireEvent('actualOrientationChange2', {orientation: self.orientation});
				lib.tools.log('lib.rotate.orientationChangeEvents: actualOrientationChange2 '+self.orientation);
			}
		}, 249);
		self.orientationChangeEnabled = true;
	};
	
	self.onRotate = function(callback, runNow, layoutView) {
		var doLayout = typeof(layoutView)=='object';
		if(runNow) {
			doLayout && layoutView.startLayout();
			callback(self.orientation);
			doLayout && layoutView.finishLayout();
		}
		if(self.orientationChangeEnabled) {
			Ti.addEventListener('actualOrientationChange2', function() {
				doLayout && layoutView.startLayout();
				callback(self.orientation);
				doLayout && layoutView.finishLayout();
			});
		}
	};

	self.load();

	return self;
};

module.exports = rotate();