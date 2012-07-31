// Requires: lib.system, lib.tools

var config = function() {
	var self = {
		config: {}
	};
	
	self.load = function(config) {
		self.config = config;
	};

	self.get = function(subArea, key, fallback) {
		var i, area, checkData, foundArea;
		var ret = fallback;
		var orientation = lib.rotate.getOrientation();
		var checkAreas = [
			'default',
			lib.system.form,
			lib.system.platform,
			orientation,
			lib.system.platform+'_'+lib.system.form,
			lib.system.platform+'_'+orientation,
			lib.system.form+'_'+orientation,
			lib.system.platform+'_'+lib.system.form+'_'+orientation
		];
		if(typeof(key)!='string' || key.length<1) {
			key = subArea;
			subArea = '';
		}
		for(i in checkAreas) {
			area = checkAreas[i];
			if(typeof(self.config[area])!='undefined') {
				checkData = self.config[area];
			} else {
				checkData = {};
			}
			if(subArea.length>0) {
				if(typeof(checkData[subArea])!='undefined') {
					checkData = checkData[subArea];
				} else {
					checkData = {};
				}
			}
			if(typeof(checkData[key])!='undefined') {
				ret = checkData[key];
				foundArea = area;
			}
		}
		// lib.tools.log('lib.config.get('+subArea+', '+key+', '+fallback+') = '+ret+' ['+foundArea+']');
		return ret;
	};
	
	return self;
}

module.exports = config();