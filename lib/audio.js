var audio = function() {
	var self = {
		sounds: [],
	};
	
	self.loadSound = function(name, path) {
		self.sounds[name] = Ti.Media.createSound({
			url: path,
			preload: true,
		});
	};
	
	self.playSound = function(name) {
		if(typeof(self.sounds[name])!='undefined') {
			self.sounds[name].play();
		}
	}
	
	return self;
}

module.exports = audio();