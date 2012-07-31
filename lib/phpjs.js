var phpjs = function() {
	var self = {};
	
	self.in_array = function(needle, haystack, argStrict) {
	    var key = '',
	        strict = !! argStrict;

	    if (strict) {
	        for (key in haystack) {
	            if (haystack[key] === needle) {
	                return true;
	            }
	        }
	    } else {
	        for (key in haystack) {
	            if (haystack[key] == needle) {
	                return true;
	            }
	        }
	    }

	    return false;
	};
	
	self.array_key_exists = function(key, search) {
	    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
	        return false;
	    }
	    return key in search;
	};
	
	return self;
}

module.exports = phpjs();
