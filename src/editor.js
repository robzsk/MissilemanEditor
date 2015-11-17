'use strict';
var THREE = require('three'),
	$ = require('jquery');

module.exports = function () {
	var _editor,
		vector = new THREE.Vector3(),
		dir,
		distance,
		pmp = new THREE.Vector2(), // previous mouse position
		pos,
		isDragging = false,
		deltaMove = new THREE.Vector2(),
		scene = new THREE.Scene(),
		cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.2, 1000),
		dlight = new THREE.DirectionalLight(0xffffff, 1),
		alight = new THREE.AmbientLight(0xffffff),
		renderer = new THREE.WebGLRenderer(),
		shifted = false,
		controlled = false;

	$(document).on('keyup keydown', function (e) {
		shifted = e.shiftKey;
		controlled = e.ctrlKey;
	});

	var setPos = function (e) {
		dir = vector.set((e.offsetX / window.innerWidth) * 2 - 1, - (e.offsetY / window.innerHeight) * 2 + 1, 0)
			.unproject(cam)
			.sub(cam.position).normalize();
		pos = cam.position.clone().add(dir.multiplyScalar(-cam.position.z / dir.z));
		pos.x = Math.round(pos.x);
		pos.y = Math.round(pos.y);
	};

	cam.position.z = 10;
	cam.position.set(5, 5, 10);
	cam.updateProjectionMatrix();

	scene.add(cam);
	scene.add(dlight);
	scene.add(alight);

	renderer.setSize(window.innerWidth, window.innerHeight);
	$('body').append(renderer.domElement);

	+function render () {
		requestAnimationFrame(render);
		renderer.render(scene, cam);
	}();

	$(renderer.domElement).on('mousedown', function (e) {
		isDragging = true;

	})
		.on('click', function () {
			if (!shifted) {
				if (controlled) {
					$(_editor).triggerHandler('editor.controlclick', pos);
				} else {
					$(_editor).triggerHandler('editor.click', pos);
				}
			}
		})
		.on('mousemove', function (e) {
			if (shifted) {
				deltaMove.set(e.offsetX - pmp.x, e.offsetY - pmp.y);
				if (isDragging) {
					cam.position.x -= (deltaMove.x * 0.01);
					cam.position.y += (deltaMove.y * 0.01);
					cam.updateProjectionMatrix();
				}
				pmp.set(e.offsetX, e.offsetY);
			}
			setPos(e);
			$(_editor).triggerHandler('editor.cursormove', pos);
		});

	$(document).on('mouseup', function (e) {
		isDragging = false;
	});

	_editor = {
		add: function (m) {
			scene.add(m);
		},
		remove: function (m) {
			scene.remove(m);
		}
	};

	return _editor;
};
