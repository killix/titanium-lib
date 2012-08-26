var profile = function() {
	var self = {
		profileCount: 0,
		currentLabel: 'default',
		data: {}
	};

	self.start = function(label) {
		self.profileCount++;
		if(typeof(label)!='string') {
			label = 'default'+self.profileCount;
		}
		self.currentLabel = label;
		self.data[label] = [];
		self.step('profile.start', label);
	};
	
	self.step = function(subLabel, label) {
		if(typeof(label)!='string') {
			label = self.currentLabel;
		}
		var now = self.now();
		duration = 0;
		if(self.data[label].length>0) {
			duration = now - self.data[label][self.data[label].length-1].now;
		}
		self.data[label].push({
			now: now,
			duration: duration,
			subLabel: subLabel
		});
	};
	
	self.report = function(label) {
		if(typeof(label)!='string') {
			label = self.currentLabel;
		}
		for(var i=0; i<self.data[label].length; i++) {
			lib.tools.log('PROFILE '+label+' | '+(typeof(self.data[label][i].duration)=='undefined'?'-':self.data[label][i].duration)+' | '+self.data[label][i].subLabel);
		}
	}
	
	self.now = function() {
		return new Date();
	};
	
	return self;
}

module.exports = profile();
