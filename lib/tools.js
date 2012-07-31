var tools = function() {
	var self = {
		logText: '',
	}

	self.log = function(msg) {
		Titanium.API.log('INFO', msg);
		self.logText += msg+"\n";
	};

	self.setBool = function(name, data) {
		Titanium.App.Properties.setBool(name, data);
	};

	self.getBool = function(name, fallback) {
		var data = Titanium.App.Properties.getBool(name, fallback);
		return data;
	};

	self.setString = function(name, data) {
		Titanium.App.Properties.setString(name, data);
	};

	self.getString = function(name, fallback) {
		var data = Titanium.App.Properties.getString(name, fallback);
		return data;
	};

	self.setInt = function(name, data) {
		self.setString(name, parseInt(data));
	};
	
	self.getInt = function(name, fallback) {
		return parseInt(self.getString(name, fallback));
	};

	self.setObject = function(name, data) {
		data = JSON.stringify(data);
		self.setString(name, data);
	},

	self.getObject = function(name, fallback) {
		var data = self.getString(name, fallback);
		try {
			data = JSON.parse(data);
			if(typeof(data)!='object') {
				data = JSON.parse(data); // I really don't know. But it works.
			}
			if(typeof(data)!='object') {
				data = {};
			}
		} catch(e) {
			data = {};
		}
		return data;
	};
	
	return self;
}

module.exports = tools();
