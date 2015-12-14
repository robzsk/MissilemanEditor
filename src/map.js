'use strict';

var _ = require('underscore'),
	$ = require('jquery'),
	assets = require('./assets'),
	type = require('./type');

var save = function (id, cells, max, spawn) {
	var x = {max: -999999, min: 999999}, y = {max: -999999, min: 999999}, data = [];
	var ret = `
module.exports = function () {
	return {
		id: ${id},
		cells: ${data},
		max: ${max},
		spawn: ${spawn}
	};
};
	`;

	_.each(cells, function (v, k) {
		var tx, ty;
		var sp = k.split('_');
		tx = parseInt(sp[1]);
		ty = parseInt(sp[0]);
		x.min = Math.min(tx, x.min);
		x.max = Math.max(tx, x.max);
		y.min = Math.min(ty, y.min);
		y.max = Math.max(ty, y.max);
	});
	x.max += Math.abs(x.min);
	y.max += Math.abs(y.min);
	console.log(x);
	_.times(y.max, function (yn) {
		data.push([]);
		_.times(x.max, function (xn) {
			data[yn][xn] = 0;
		});
	});
	_;
	console.log(JSON.stringify(data, null, '\t'));
};

module.exports = function () {
	var _map,
		data = {};

	_map = {
		save: function () {
			save(null, data, null, null);
		},

		add: function (v, t) {
			var d = data[v.y + '_' + v.x] || {};
			d.type = t;
			if (d.mesh) {
				$(_map).trigger('map.remove', d.mesh);
			}

			d.mesh = assets[t]();
			d.mesh.position.set(v.x, v.y, 0);
			$(_map).trigger('map.add', d.mesh);

			data[v.y + '_' + v.x] = d;
		},

		remove: function (v) {
			var d = data[v.y + '_' + v.x] || {};
			if (d.mesh) {
				$(_map).trigger('map.remove', d.mesh);
				delete data[v.y + '_' + v.x];
			}
		}

	};
	return _map;
}();
