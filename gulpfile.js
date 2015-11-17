'use strict';

var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	browserSync = require('browser-sync').create();

gulp.task('copy-normalize', function () {
	return gulp
		.src('./node_modules/normalize.css/normalize.css')
		.pipe(gulp.dest('css'));
});

gulp.task('build', ['copy-normalize'], function () {
	return browserify('src/index.js')
		.bundle()
		.pipe(source('mm.editor.bundle.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('reload', ['build'], function () {
	browserSync.reload();
});

gulp.task('default', ['build'], function () {
	browserSync.init({
		open: false,
	// proxy: 'localhost'
	});
	gulp.watch(['index.html', 'src/*.js', 'src/**/*.js'], ['reload']);
});
