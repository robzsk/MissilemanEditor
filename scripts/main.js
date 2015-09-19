//TODO: write a cursor manager module
var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5),
material = new THREE.MeshLambertMaterial({
		color : 0x00ff00
	}),
cube = new THREE.Mesh(geometry, material),
mode = type.solid;

//TODO: move this to a interface module
$(document).ready(function () {
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
});

$(document).ready(function () {
	'use strict';
	
	$(assets).on('assets.loaded', function () {

		var cursor = cube.clone(),
		ed = editor(),
		n = 10;

		ed.add(cursor);

		$(ed).on('editor.cursormove', function (e, p) {
			cursor.position.x = p.x;
			cursor.position.y = p.y;
		});

		$(ed).on('editor.click', function (evt, p) {
			if (p.x >= 0 && p.x < n) {
				map.add(p, mode);
			}
		});

		$(ed).on('editor.controlclick', function (evt, p) {
			map.remove(p);
		});

		$(map).on('map.remove', function (evt, mesh) {
			ed.remove(mesh);
		});

		$(map).on('map.add', function (evt, mesh) {
			ed.add(mesh);
		});

		map.initEmpty(n);

	});
});
