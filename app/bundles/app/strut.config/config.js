define(function () {
	var config = {
		slide: {
			size: {
				width: 1920,
				height: 1080
			},
			overviewSize: {
				width: 80,
				height: 45
			}
		}
	};

	var temp = localStorage.getItem("Strut_sessionMeta");
	try {
		var sessionMeta = JSON.parse(temp);
	} catch (e) {
	}

	var sessionMeta = sessionMeta || {
		generator_index: 0
	};

	window.config = config;
	window.sessionMeta = sessionMeta;

	return config;
});