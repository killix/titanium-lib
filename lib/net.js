var net = {
	isOnline: function() {
		return Titanium.Network.online;
	},
	
	getJson: function(url, callback, errorCallback, returnString) {
		if(lib.net.isOnline()) {
			var loader = Titanium.Network.createHTTPClient();
			loader.onload = function(){
				var data = this.responseText;
				if(!returnString) {
					try {
						data = JSON.parse(data);
					} catch(e) {
						data = {};
					}
				}
				callback(data);
			};
			loader.onerror = function(){
				errorCallback();
			};
			loader.open('GET', url);
			loader.send();
		} else {
			errorCallback();
		}
	}
};

module.exports = net;
