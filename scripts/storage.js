var storage = function () {
	'use strict';

	var s = function (k, v) {
		if (k && v) {
			simpleStorage.set(k, v);
		} else if (k && !v) {
			return simpleStorage.get(k);
		} else {
			console.log('ERROR: Key was undefined while using local storage.');
		}
	}

	return {
		map : function (v) {
			return s('map', v);
		}
	};
}();
