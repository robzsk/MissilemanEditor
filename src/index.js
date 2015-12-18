'use strict';

var THREE = require('three'),
	$ = require('jquery'),
	assets = require('./assets'),
	editor = require('./editor'),
	map = require('./map'),
	type = require('./type');

$(document).ready(function () {
	var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5),
		material = new THREE.MeshLambertMaterial({
			color: 0x00ff00
		}),
		cube = new THREE.Mesh(geometry, material),
		mode = type.solid;

	$('.item').click(function () {
		$('.item').removeClass('selected');
		$(this).addClass('selected');

		switch ($(this).index()) {
			case 1:
				mode = type.destructible;
				break;
			case 2:
				mode = type.manOnly;
				break;
			case 3:
				mode = type.missileOnly;
				break;
			case 4:
				mode = type.target;
				break;
			default:
				mode = type.solid;
		}

	}).hover(function () {
		$(this).addClass('hover');
	}, function () {
		$(this).removeClass('hover');
	});

	$(assets).on('assets.loaded', function () {
		var cursor = cube.clone(),
			ed = editor();

		ed.add(cursor);

		$(ed).on('editor.cursormove', function (e, p) {
			cursor.position.x = p.x;
			cursor.position.y = p.y;
		});

		$(ed).on('editor.click', function (evt, p) {
			map.add(p, mode);
		});

		$(ed).on('editor.controlclick', function (evt, p) {
			map.remove(p);
		});

		$(map).on('map.remove', function (evt, mesh) {
			ed.remove(mesh);
		});

		$(document).on('keyup', function (e) {
			if (e.key === 's') {
				map.save();
			}
		});

		$(map).on('map.add', function (evt, mesh) {
			ed.add(mesh);
		});

	});
	assets.load();
});
