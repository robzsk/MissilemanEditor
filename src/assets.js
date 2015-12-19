'use strict';
var THREE = require('three'),
	$ = require('jquery');

module.exports = function () {
	var _assets,
		manager = new THREE.LoadingManager(),
		textureLoader = new THREE.TextureLoader(),
		jsonLoader = new THREE.JSONLoader(manager),
		mesh = {};

	var loadTexture = function (tf) {
		return new THREE.MeshLambertMaterial({
			map: THREE.ImageUtils.loadTexture(tf)
		});
	};

	var smallCube = function (color) {
		var cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshLambertMaterial({ color: color }));
		cube.scale.set(0.25, 0.5, 0.5);
		return cube;
	};

	var loadMesh = function (name, mf, tf) {
		textureLoader.load('assets/' + tf + '.png', function (texture) {
			jsonLoader.load('assets/' + mf + '.json', function (geom) {
				var material = new THREE.MeshBasicMaterial({
					map: texture
				});
				// TODO: cache previously loaded mesh
				mesh[name] = new THREE.Mesh(geom, material);
				mesh[name].castShadow = true;
				mesh[name].receiveShadow = true;
			});

		});
	};

	manager.onLoad = function () {
		$(_assets).trigger('assets.loaded');
	};

	_assets = {
		load: function () {
			loadMesh('empty', 'empty', 'wall');
			loadMesh('wall', 'wall', 'wall');

			loadMesh('target-red', 'wall', 'target-red');
			loadMesh('target-green', 'wall', 'target-green');
			loadMesh('target-blue', 'wall', 'target-blue');

			mesh['spawn-red'] = smallCube(0xff0000);
			mesh['spawn-green'] = smallCube(0x00ff00);
			mesh['spawn-blue'] = smallCube(0x0000ff);
		},

		empty: function (n) {
			return mesh['empty'].clone();
		},

		wall: function () {
			return mesh['wall'].clone();
		},

		'spawn-red': function () {
			return mesh['spawn-red'].clone();
		},

		'spawn-green': function () {
			return mesh['spawn-green'].clone();
		},

		'spawn-blue': function () {
			return mesh['spawn-blue'].clone();
		},

		'target-red': function () {
			return mesh['target-red'].clone();
		},

		'target-green': function () {
			return mesh['target-green'].clone();
		},

		'target-blue': function () {
			return mesh['target-blue'].clone();
		}

	};

	return _assets;

}();
