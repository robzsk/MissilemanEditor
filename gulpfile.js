'use strict';

var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	gutil = require('gulp-util');

gulp.task('copy-normalize', function () {
	return gulp
		.src('./node_modules/normalize.css/normalize.css')
		.pipe(gulp.dest('css'));
});

gulp.task('build', ['copy-normalize'], function () {
	return browserify('src/index.js')
		.bundle()
		.pipe(source('mm.editor.bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		// .pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./', {
			sourceMappingURLPrefix: 'http://localhost:8080/dist/'
		}))
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
