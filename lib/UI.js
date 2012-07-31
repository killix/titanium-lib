var ui = function() {
	var self = {};
	
	self.prompt = function(title, callback) { // TODO: Langfristig: Schönes Promt-Fenster bauen.
		var window = Ti.UI.createWindow({
			backgroundColor: '#000',
			opacity: .8
		});

		var view = Ti.UI.createView({
			backgroundColor: '#EEE',
			width: '90%',
			top: '10%',
			height: 80,
			borderRadius: 10,
			borderColor: '#183067',
			borderWidth: 3,
			opacity: 1
		});
		window.add(view);

		var label = Ti.UI.createLabel({
			left: 10,
			right: 10,
			top: 10,
			height: 20,
			text: title
		});
		view.add(label);
		
		var input = Ti.UI.createTextField({
			left: 10,
			right: 10,
			top: 40,
			height: 30,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		view.add(input);
		
		input.addEventListener('return', function(e) {
			window.close();
			callback(input.value);
		})

		window.open();
		
		return true;
	};

	self.browser = function(viewOptions, browserOptions) {
		var self = Ti.UI.createView(viewOptions);

		var webView = Ti.UI.createWebView(browserOptions);
		self.add(webView);

		// TODO: Add activity indicator to browser thingy

		// var activity = ui.activityOverlay();
		// web.add(activity);

		var browserLoadEvent = function(e) {
			// activity.fadeOut();
		};

		var browserErrorEvent = function(e) {
			alert(L('error.load'));
			// activity.fadeOut();
		};

		webView.addEventListener('error', browserErrorEvent);
		webView.addEventListener('load', browserLoadEvent);

		self.loadUrl = function(url) {
			webView.stopLoading();
			// activity.fadeIn(false, function() {
				// When keeping the browser, then SOMETIMES the view will just be empty even though the content seems to have loaded just fine.
				self.remove(webView);
				webView = Ti.UI.createWebView(browserOptions);
				self.add(webView);
				webView.addEventListener('error', browserErrorEvent);
				webView.addEventListener('load', browserLoadEvent);
				webView.url = url;
			// });

		};

		self.getUrl = function() {
			return webView.url;
		};

		if(typeof(browserOptions)=='object' && typeof(browserOptions.url)!='undefined') {
			self.loadUrl(browserOptions.url);
		}

		return self;
	}
	
	return self;
};

module.exports = ui();
