'use strict';

var _ = require('underscore'),
	$ = require('jquery'),
	assets = require('./assets'),
	type = require('./type');

var serializeType = function (t) {
	switch (t) {
		case type.empty:
			return 0;
		case type.wall:
			return 1;
		default:
			return 0;
	}
};

var save = function (id, data, max) {
	var output = {
		cells: []
	};
	_.each(data, function (row, y) {
		output.cells.push([]);
		_.each(row, function (cell, x) {
			var split, t, f;
			if (cell.type === type.wall) {
				output.cells[output.cells.length - 1].push(1);
			} else {
				output.cells[output.cells.length - 1].push(0);
			}
			if (cell.type !== type.wall && cell.type !== type.empty) {
				split = cell.type.split('-');
				t = split[0];
				f = split[1];
				output[t] = output[t] || {};
				output[t][f] = {x: x, y: y};
			}
		});
	});
	window.prompt('Copy to clipboard: Ctrl+C, Enter', JSON.stringify(output));
};

module.exports = function () {
	var _map,
		data = [];

	var remove = function (cell) {
		var x = cell.mesh.position.x, y = cell.mesh.position.y;
		$(_map).trigger('map.remove', cell.mesh);
		cell.type = type.empty;
		cell.mesh = assets[type.empty]();
		cell.mesh.position.set(x, y, 0);
		$(_map).trigger('map.add', cell.mesh);
	};

	_map = {
		save: function () {
			save(0, data, 20, JSON.stringify({x: 1.5, y: 27}));
		},

		load: function () {
			var n = window.prompt('Enter map as JSON:', '{"cells":[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,1],[0,0,0,0,0,0,1]],"target":{"blue":{"x":0,"y":4},"green":{"x":1,"y":4},"red":{"x":2,"y":4}},"spawn":{"blue":{"x":0,"y":5},"green":{"x":1,"y":5},"red":{"x":2,"y":5}}}');
			var loaded = JSON.parse(n);
			// assumes all is good
			$(_map).trigger('map.clear');
			data = [];
			_.each(loaded.cells, function (row, y) {
				data.push([]);
				_.each(row, function (cell, x) {
					var t = cell === 1 ? type.wall : type.empty,
						mesh = assets[t]();
					mesh.position.set(x, y, 0);
					data[y].push({
						type: t, mesh: mesh
					});
					$(_map).trigger('map.add', mesh);
				});
			});
			_.each(loaded, function (v, k) {
				if (k !== 'cells') {
					_.each(v, function (val, key) {
						_map.add({ x: val.x, y: val.y }, k + '-' + key);
					});
				}
			});
		},

		add: function (v, t) {
			var cell, mx;

			// invalid placement
			if (v.x < 0 || v.y < 0) {
				console.log('map.js: placement was less than zero');
				return;
			}

			// the map has become larger?
			if (data.length <= v.y || data[0].length <= v.x) {
				while(data.length <= v.y){
					data.push([]);
				}
				mx = Math.max(data[0].length - 1, v.x);
				_.each(data, function (row, y) {
					var mesh;
					while(row.length <= mx){
						mesh = assets[type.empty]();
						mesh.position.set(row.length, y, 0);
						row.push({
							type: type.empty,
							mesh: mesh
						});
						$(_map).trigger('map.add', mesh);
					}
				});
			}

			// there can be only one type of all but walls
			if (t !== 'wall') {
				_.each(data, function (row) {
					_.each(row, function (cell) {
						if (cell.type === t) {
							remove(cell);
						}
					});
				});
			}

			// add the requested type
			cell = data[v.y][v.x];
			$(_map).trigger('map.remove', cell.mesh);
			cell.type = t;
			cell.mesh = assets[t]();
			cell.mesh.position.set(v.x, v.y, 0);
			$(_map).trigger('map.add', cell.mesh);
		},

		remove: function (v) {
			var cell;

			if (v.x < 0 || v.y < 0) {
				console.log('map.js: remove was less than zero');
				return;
			}
			if (v.x >= data[0].length || v.y >= data.length) {
				return;
			}
			remove(data[v.y][v.x]);
		}

	};
	return _map;
}();
