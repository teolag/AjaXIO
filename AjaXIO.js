var Ajax = (function() {
	var xhr,

	get = function(url, data, success, settings) {
		var settings = settings || {};
		settings.url = url;
		settings.data = data;
		settings.success = success;
		custom(settings);
	},

	post = function(url, data, success, settings) {
		var settings = settings || {};
		settings.type="POST";
		get(url, data, success, settings);
	},

	get2JSON = function(url, data, success, settings) {
		var settings = settings || {};
		settings.responseType="json";
		get(url, data, success, settings);
	},

	post2JSON = function(url, data, success, settings) {
		var settings = settings || {};
		settings.responseType="json";
		post(url, data, success, settings);
	},

	custom = function(s) {
		var url = s.url;
		if(!s || !url) {
			return error("no uri specified");
		}

		var type = s.type? s.type.toUpperCase() : "GET";
		if(type!=="GET" && type!=="POST") {
			return error("invalid request type");
		}
		var async = s.async? s.async : true;

		var dataString="";
		var formData;
		if(s.data instanceof FormData) {
			formData = s.data;
			type="POST";
		} else if(s.data instanceof Element) {
			formData = new FormData(s.data);
			type="POST";
		} else if(typeof s.data === "object") {
			var parts = [];
			for (var i in s.data) {
				if (s.data.hasOwnProperty(i)) {
					parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(s.data[i]));
				}
			}
			dataString = parts.join("&");
		} else if(typeof s.data === "string") {
			dataString = s.data;
		} else {
			return error("unknown data type:", typeof s.data);
		}

		if(type==="GET" && dataString) {
			url += "?" + dataString;
		} 

		xhr = new XMLHttpRequest();
		xhr.open(type, url, async);

		if(type==="POST" && dataString) {
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			formData = dataString;
		}
		
		var parseAsJSON=false;
		if(s.responseType=="json") {
			xhr.responseType = "json";
			if(xhr.responseType !== "json") {
				parseAsJSON=true;
			}
		}

		xhr.onload = function(e) {
			var xhr = e.target;
			if(e.target.status===200) {
				if(s.success) {
					if(xhr.responseType=="json") {
						if(xhr.response) {
							s.success(xhr.response);
						} else {
							return error("response is not valid JSON", xhr);
						}
					} else if(parseAsJSON) {
						try {
							var json = JSON.parse(xhr.responseText);
							s.success(json);
						} catch(ex) {
							return error("could not parse JSON", xhr);
						}
					} else {
						s.success(e.target);
					}
				}
			} else {
				if(errorCallback) errorCallback(e.target);
				return error("request failed", xhr);
			}
		};
		xhr.send(formData);
	},

	error = function(m, xhr) {
		console.error("AjaXIO error: " + m, xhr); return false;
	};

	return {
		get: get,
		post: post,
		get2JSON: get2JSON,
		getJSON: get2JSON,
		post2JSON: post2JSON,
		custom: custom
	};
})();