var map = (function () {
	'use strict';

	var _map,
	data = [],
	size;

	var zero = function () {
		var ret = [];
		_.times(size, function (y) {
			ret.push([]);
			_.times(size, function (x) {
				var m = assets.empty();
				ret[y].push({
					mesh : m,
					type : type.empty
				});
				m.position.set(x, y, 0);
				$(_map).trigger('map.add', m);
			});
		});
		return ret;
	};

	_map = {
		initEmpty : function (s) {
			size = s;
			data = zero();
		},

		add : function (v, t) {
			var d = data[v.y][v.x];
			d.type = t;
			if (d.mesh) {
				$(_map).trigger('map.remove', d.mesh);
			}

			d.mesh = assets[t]();
			d.mesh.position.set(v.x, v.y, 0);
			$(_map).trigger('map.add', d.mesh);
		},

		remove : function (v) {
			var d = data[v.y][v.x];
			if (d.type === type.empty) {
				return;
			}
			d.type = type.empty;
			if (d.mesh) {
				$(_map).trigger('map.remove', d.mesh);
			}
			d.mesh = assets.empty(0);
			d.mesh.position.set(v.x, v.y, 0);
			$(_map).trigger('map.add', d.mesh);
		}

	};
	return _map;
}());
