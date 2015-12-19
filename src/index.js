'use strict';

var THREE = require('three'),
	$ = require('jquery'),
	assets = require('./assets'),
	editor = require('./editor'),
	map = require('./map');

$(document).ready(function () {
	// TODO: move this to assets
	var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5),
		material = new THREE.MeshLambertMaterial({
			color: 0xffffff
		}),
		cube = new THREE.Mesh(geometry, material),
		mode = 'wall';

	$('.item').click(function () {
		mode = $(this).children().attr('class');
		$('.item').removeClass('selected');
		$(this).addClass('selected');
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
			} else if (e.key === 'l') {
				map.load();
			}
		});

		$(map).on('map.add', function (evt, mesh) {
			ed.add(mesh);
		});

		$(map).on('map.clear', function () {
			ed.clear();
		});

	});
	assets.load();
});
