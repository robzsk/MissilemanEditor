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
			loadMesh('empty', 'empty', 'solid');
			loadMesh('solid', 'solid', 'solid');
			loadMesh('destructible', 'solid', 'destructible');
			loadMesh('manOnly', 'solid', 'manOnly');
			loadMesh('missileOnly', 'solid', 'missileOnly');
			loadMesh('target', 'solid', 'target');
		},

		empty: function (n) {
			return mesh['empty'].clone();
		},

		solid: function () {
			return mesh['solid'].clone();
		},

		destructible: function () {
			return mesh['destructible'].clone();
		},

		manOnly: function () {
			return mesh['manOnly'].clone();
		},

		missileOnly: function () {
			return mesh['missileOnly'].clone();
		},

		target: function () {
			return mesh['target'].clone();
		}

	};

	return _assets;

}();
